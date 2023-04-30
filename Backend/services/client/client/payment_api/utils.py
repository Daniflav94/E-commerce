import requests
import base64
import json
import string
import random

from gerencianet import Gerencianet
from django.conf import settings
from client.register.models import Clients

def get_token_api_payment():
    credentials = {
    "client_id": settings.DEV_CLIENT_KEY,
    "client_secret": settings.DEV_SECRET_KEY,
}

    certificado = f'client/payment_api/certificates/{settings.CERT_DEV}'  # A variável certificado é o diretório em que seu certificado em formato .pem deve ser inserido
    
    auth = base64.b64encode(
        (f"{credentials['client_id']}:{credentials['client_secret']}"
        ).encode()).decode()

    url = "https://api-pix-h.gerencianet.com.br/oauth/token"  #Para ambiente de Desenvolvimento

    payload="{\r\n    \"grant_type\": \"client_credentials\"\r\n}"
    headers = {
        'Authorization': f"Basic {auth}",
        'Content-Type': 'application/json'
    }

    response = requests.request("POST",
                                url,
                                headers=headers,
                                data=payload,
                                cert=certificado)
    access = response.json()

    return access['access_token']

def _headers():
    heraders = {
        'Authorization': f'Bearer {get_token_api_payment()}',
        'Content-Type': 'application/json'
    }
    return heraders

def generate_key_pix():
    print('Gerando chave...')

    certificado = f'{settings.PATH_CREDENTIALS}{settings.CERT_DEV}'

    url = "https://api-pix-h.gerencianet.com.br/v2/gn/evp"

    payload={}
    headers = {
        'authorization': f'Bearer {get_token_api_payment()}',
        #'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload, cert=certificado)
    print(response)

    return response.json()

def txid_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def pix_payment(client_id, shopping_cart, total, name_information="Campo adicional", additional_information="Informação adicional"):
    clients = Clients.objects.filter(pk=client_id)
    client = [info.to_json() for info in clients]

    headers = _headers()
    certificado = f'client/payment_api/certificates/{settings.CERT_DEV}'

    url = f'{settings.GN_BASE_URL}/v2/cob'
    payload = json.dumps({
    "calendario": {
        "expiracao": 3600
    },
    "devedor": {
        "cpf": client[0]['cpf'],
        "nome": client[0]['name']
    },
    "valor": {
        "original": str(total)
    },
    "chave": "e63a6451-ec39-450a-aaac-6310baaa25e7",
    "solicitacaoPagador": "Informe o número ou identificador do pedido."
    })

    response = requests.request("POST", url, headers=headers, data=payload, cert=certificado)
    
    #save_pix(response.json(), request.user.pk, company)

    return response.json()

def generate_qr_code(loc_id):

    headers = _headers()
    certificate = f'{settings.PATH_CREDENTIALS}{settings.CERT_DEV}'

    if loc_id:
        url = url = f"{settings.GN_BASE_URL}/v2/loc/{loc_id}/qrcode"
    else:
        return 'Informe o id de localização da cobrança'

    response = requests.request("GET", url, headers=headers, data={}, cert=certificate)
    qrcode = response.json()

    return qrcode['imagemQrcode']

def pix_revision(txid):

    headers = _headers()
    certificado = f'{settings.PATH_CREDENTIALS}{settings.CERT_DEV}'

    if txid:
        url = f'{settings.GN_BASE_URL}/v2/cob/{txid}'
    else:
        return 'Informe o localizador da cobrança'

    payload = json.dumps({
            "calendario": {
                "expiracao": 600
            },
            "devedor": {
                "nome": "Fukuma",
                "cpf": "70921227086"
            },
            "valor": {
                "original": "3000.00"
            },
            "chave": "03659197050",
            "solicitacaoPagador": "Informe o número ou identificador do pedido.",
            "infoAdicionais": [
                {
                "nome": "Campo 1",
                "valor": "valor 1"
                }
            ]
            })

    response = requests.request("PATCH", url, headers=headers, data=payload, cert=certificado)

    return response