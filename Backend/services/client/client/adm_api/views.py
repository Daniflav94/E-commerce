from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import IntegrityError
from django.db.models import Q
from django.conf import settings

from client.register.models import *

from .utils import _create_token

@csrf_exempt
def create_user(request):
    user_email = request.POST.get('user_email', None)
    password = request.POST.get('password', None)
    type_user = request.POST.get('type_user', None)
    full_name = request.POST.get('full_name', None)
    phone = request.POST.get('phone', None)
    cpf = request.POST.get('cpf', None)

    if full_name and user_email and password:
        #Check email already exists
        if User.objects.filter(email=user_email).exists():
            try:
                user = User.objects.get(email=user_email)
            except User.MultipleObjectsReturned:
                return JsonResponse({'message': 'Email já cadastrado', 'status': 400})
            if not user.is_company:
                return JsonResponse({'message': 'Email já cadastrado', 'status': 400})
        else:
            #create user
            if type_user == 'client':
                try:
                    user = User.objects.create(email=user_email)
                    user.email = user_email
                    user.set_password(password)
                    user.is_active = True
                    user.is_client = True
                    user.activation_key = _create_activation_token()
                    session_token = _create_token(user)
                    user.save()
                    client, _ = Clients.objects.get_or_create(user=user)
                    client.full_name = full_name
                    client.whatsapp = phone
                    client.cpf = cpf
                    client.save()

                    return JsonResponse({'message': 'Usuário cadastrado com sucesso', 'id': user.id, 'token': session_token, 'status': 200})
                except IntegrityError:
                    #email duplicate
                    return JsonResponse({'message': 'Emais já cadastrado', 'status': 400})

            if type_user == 'company':
                return JsonResponse({'message': 'Cadastro para usuários', 'status': 400})
        
            else:
                return JsonResponse({'message': 'Tipo inválido', 'status': 400})

        return JsonResponse({'message': 'Erro ao cadastrar usuário', 'status': 400})
    return JsonResponse({'message': 'Informe os campos obrigatórios', 'status': 400})