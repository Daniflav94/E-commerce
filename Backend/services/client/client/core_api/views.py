from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.utils import timezone
from django.db.models import Count
import json

from .utils import _create_token
from client.register.models import *
from .forms import ShoppingCartForm, ClientsForm
from client.payment_api.utils import pix_payment, generate_qr_code

@csrf_exempt
def login(request):
    user_email = request.POST.get('email', None)
    password = request.POST.get('password', None)
    type_user = request.POST.get('type', None)

    if user_email and password:
        user = authenticate(username=user_email, password=password, email=user_email)
        if user is not None:
            if user.is_consumer and user.is_company:
                _type = 'consumer_company'
            elif user.is_consumer and not user.is_company and not user.is_staff:
                _type = 'consumer'
                full_name = user.consumer_name.full_name
                picture_url = user.consumer_name.picture_url
            elif user.is_company and not user.is_consumer:
                _type = 'company'
                full_name = user.company_name.public_name
                picture_url = user.company_name.picture_url
            elif user.is_staff:
                _type = 'staff'
                full_name = user.consumer_name.full_name
                picture_url = user.consumer_name.picture_url
            else:
                _type = ''

            if _type == type_user:
                session_token = _create_token(user)
                user.last_login = timezone.now()
                user.save()

                return JsonResponse({
                    '_id': user.id,
                    '_token': session_token,
                    'type': _type,
                    'full_name': full_name,
                    'picture_url': picture_url,
                    'message': 'Login efetuado com sucesso.',
                    'status': 200
                })
            else: 
                return JsonResponse({'message':'Usuário ou senha inválidos.', 'status': 400})

        else:
            return JsonResponse({'message':'Usuário ou senha inválidos.', 'status': 400})
    else:
        return JsonResponse({'message':'Usuário ou senha inválidos.', 'status': 400})

@csrf_exempt
def get_products(request, pk=None):
    skip = request.GET.get('skip')
    take = request.GET.get('take')
    
    pk = request.GET.get('pk', None)
    
    if skip and take:
        try:
            skip = int(skip)
            take = int(take)
        except ValueError:
            return JsonResponse({'message': 'Erro ao pesquisar card.', 'status': 400})
    else:
        skip = 0
        take = 999999999
    
    if pk:
        all_products = Products.objects.get(pk=pk)
        products = all_products.to_product_json()
    else:
        all_products = Products.objects.all()[skip:take + skip]
        products = [product.to_product_json() for product in all_products]
    
    return JsonResponse({
        'products': products,
        'message': 'Pesquisa realizada com sucesso',
        'status': 200
    })
    
@csrf_exempt
def feature_products(request):
    if request.method == 'GET':
        products = Products.objects.order_by('-created_at')[:10]
        feature_products = [product.to_product_json() for product in products]

        return JsonResponse({
            'products': feature_products,
            'status': 200
        })
    else:
        return JsonResponse({'message': 'Método errado', 'status': 404})
    
@csrf_exempt
def get_products_category(request):
    if request.method == 'GET':
        skip = request.GET.get('skip', None)
        take = request.GET.get('take', None)

        if skip and take:
            try:
                skip = int(skip)
                take = int(take)
            except ValueError:
                return JsonResponse({'message': 'Erro ao pesquisar card.', 'status': 400})
        else:
            skip = 0
            take = 999999999
            
        all_products = Products.objects.values('category__category') \
            .annotate(total=Count('id')).order_by('-total')[skip:take + skip]
            
        return JsonResponse({
            'categories_products': list(all_products),
            'message': 'Pesquisa realizada com sucesso',
            'status': 200,
        })
    else:
        return JsonResponse({'message': 'Método errado', 'status': 404})
        
@csrf_exempt
def search_products(request):
    if request.method == 'GET':
        category = request.GET.get('category', None)
        skip = request.GET.get('skip', None)
        take = request.GET.get('take', None)

        if skip and take:
            try:
                skip = int(skip)
                take = int(take) + skip
            except ValueError:
                return JsonResponse({'message': 'Erro ao consultar produtos', \
                    'status': 400}, status=400)
        else:
            skip = 0
            take = 999999999
        
        filters = {}
            
        if category:
            filters['category'] = category
            
        if request.GET.get('search'):
            filters['name__unaccent__icontains'] = request.GET.get('search')
            
        products = [product.to_product_json() for product in Products.objects.filter(**filters) \
            .order_by('name')[skip:take + skip]]
        
        return JsonResponse({'products': products, 'status': 200})
    
    else:
        return JsonResponse({'message': 'Método errado', 'status': 404})
    
@csrf_exempt
def add_product_shoping_cart(request):
    amount = request.POST.get('amount', None)
    data = request.POST.copy()

    if Shopping_Cart.objects.filter(product=data['product']).exists():
        old_amount = Shopping_Cart.objects.get(product=data['product'], consumer=request.user.pk)
        data['amount'] = old_amount.amount + int(amount)
        try:
            cart = Shopping_Cart.objects.filter(product=data['product']).first()
            form = ShoppingCartForm(instance=cart, data=data)
        except Shopping_Cart.DoesNotExist:
            form = ShoppingCartForm(data=data)

        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Produto adicionado ao carrinho', 'status': 200})
        else:
            print(form.errors)
            return JsonResponse({'message': 'Erro form', 'status': 404})
    else:
        form = ShoppingCartForm(data=data)

        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Produto adicionado ao carrinho', 'status': 200})
        else:
            print(form.errors)
            return JsonResponse({'message': 'Erro form', 'status': 404})

@csrf_exempt
def create_client(request):
    data = request.POST.copy()

    if Clients.objects.filter(cpf=data['cpf']).exists():
        client_id = Clients.objects.filter(cpf=data['cpf'])
        client = [id.id_to_json() for id in client_id]
        return JsonResponse({'client': client, 'status': 200})
    else:
        form = ClientsForm(data=data)

        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Cliente cadastrado com sucesso', 'status': 200})
        else:
            return JsonResponse({'message': f'Erro ao salvar cliente {form.errors}', 'status': 404})

    return JsonResponse({'message': 'Informações incorretas', 'status': 404}) 

@csrf_exempt
def add_product_car(request):
    client_id = request.POST.get('client_id', None)
    shopping_cart = json.loads(request.POST.get('shopping_cart', []))
    total = request.POST.get('total', 0)
    type_payment = request.POST.get('type_payment', None)
    name_information = request.POST.get('name_information', '')
    additional_information = request.POST.get('additional_information', '')
    #payment = json.loads(request.POST.get('payment', []))
    qrcode = request.POST.get('qrcode', False)

    if type_payment == 'pix' or type_payment == 'Pix':
        pix = pix_payment(client_id, shopping_cart, total, name_information, additional_information)
        if qrcode == 'True' or qrcode == 'true':
            loc_id = pix['loc']['id']
            code = generate_qr_code(loc_id)
            return JsonResponse({'message': code, 'status': 200})
        return JsonResponse({'message': pix, 'status': 200})

    if type_payment == 'qrcode' and loc_id:
        qrcode = generate_qr_code(loc_id)
        return JsonResponse({'message': qrcode, 'status': 200})

    return JsonResponse({'message': pix, 'status': 200})
