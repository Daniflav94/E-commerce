from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from django.db.models import Count

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
            
        all_products = Products.objects.values('product_subcategory__sub_category', \
            'product_subcategory__category__category') \
            .annotate(total=Count('id')).order_by('-total', 'product_subcategory__sub_category', \
                'product_subcategory__category__category')[skip:take + skip]
            
        categories = {}
        for product in all_products:
            category_name = product['product_subcategory__category__category']
            subcategory_name = product['product_subcategory__sub_category']
            total = product['total']
            
            if category_name not in categories:
                categories[category_name] = {
                    'total': 0,
                    'subcategories': []
                }
                
            categories[category_name]['total'] += total
            
            if subcategory_name not in categories[category_name]['subcategories']:
                categories[category_name]['subcategories'][subcategory_name] = 0
                
            categories[category_name]['subcategories'][subcategory_name] += total
            
        results = []
        for category_name, category_data in categories.items():
            subcategories = [{'name': name, 'total': total_sub} for name, total_sub in category_data['subcategories'].items()]
            subcategories.sort(key=lambda x: x['total'], reverse=True)
            
            results.append({
                'category_name': category_name,
                'total': category_data['total'],
                'subcategories': subcategories,
            })
            
        results.sort(key=lambda x: x['total'], reverse=True)
        
        return JsonResponse({
            'categories_products': results,
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
            filters['product_name__unaccent__icontains'] = request.GET.get('search')
            
        products = [product.to_product_json() for product in Products.objects.filter(**filters) \
            .order_by('product_name')[skip:take + skip]]
        
        return JsonResponse({'products': products, 'status': 200})
    
    else:
        return JsonResponse({'message': 'Método errado', 'status': 404})