from rest_framework import serializers
from django.contrib.auth.models import User

#Serializer registro Usuarios
class RegistroSerializer(serializers.ModelSerializer):
    password2= serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username','email','password','password2']
        extra_kwargs ={
            'password': {'write_only' : True}
            } 

#Validacion Personalizada, se consultan por IS_VALID en serializadores

    def save(self):
        password = self.validated_data['password']    
        password2 = self.validated_data['password2'] 
        
        if password != password2:
            raise serializers.ValidationError({'Error': 'El password de confirmacion no coincide'})
        
        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError({'Error' : 'El email del usaurio ya existe'})
        
        account = User(email=self.validated_data['email'], username=self.validated_data['username'])
        account.set_password(password)
        account.save()
        return account