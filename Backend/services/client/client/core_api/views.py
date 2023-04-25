from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from django.db.models import Count
import json

from client.register.models import *
from .forms import ShoppingCartForm, ClientsForm

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
    print(data['email'])

    if Clients.objects.filter(email=data['email']).exists():
        return JsonResponse({'message': 'Email já cadastrado', 'status': 400})
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
    products_ids = json.loads(request.POST.get('products_ids', []))
    print(products_ids)

    data = {}
    for product in products_ids:
        print(product)
        if product['selected'] == 'true' or product['selected'] == 'True':
            product['selected'] = True
        else:
            product['selected'] = False

        if Shopping_Cart.objects.filter(product=product['product']).exists():
            try:
                product_cart = Shopping_Cart.objects.filter(product=product['product']).first()
                
                form = ShoppingCartForm(instance=product_cart, data=product)

                if form.is_valid:
                    form.save()
                else:
                    return JsonResponse({'message': 'Erro ao adicionar itens no carrinho', 'status': 404})
                
            except Shopping_Cart.DoesNotExist:
                form = ShoppingCartForm(data=product)

                if form.is_valid:
                    form.save()
                    return JsonResponse({'message': 'Itens adicionados com sucesso', 'status': 200})
                else:
                    return JsonResponse({'message': 'Erro ao adicionar itens no carrinho', 'status': 404})
        else:
            product['product'] = int(product['product'])
            form = ShoppingCartForm(data=product)

            if form.is_valid:
                form.save()
            else:
                return JsonResponse({'message': 'Erro ao adicionar itens no carrinho', 'status': 404})
                

    return JsonResponse({'message': 'Itens adicionados com sucesso', 'status': 200})
