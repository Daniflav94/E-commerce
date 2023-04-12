from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from django.db.models import Count

from client.register.models import *
from .forms import ShoppingCartForm

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
        skip = request.GET.get('skip', None)
        take = request.GET.get('take', None)

        if skip and take:
            try:
                skip = int(skip)
                take = int(take) + skip
            except ValueError:
                return JsonResponse({'message': 'Erro ao consultar áreas \
                    de abrangência.', 'status': 400}, status=400)
        else:
            skip = 0
            take = 999999999
            
        filters = {}
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