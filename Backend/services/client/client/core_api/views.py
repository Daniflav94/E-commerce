from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest

from client.register.models import *

@csrf_exempt
def get_products(request, pk=None):
    skip = request.GET.get('skip')
    take = request.GET.get('take')
    
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
    