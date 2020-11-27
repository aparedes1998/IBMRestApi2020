# IBMRestApi2020

En este repositorio, se encuentra la solución a la alternativa 1.

## Introducción

Como consigna, se pide que se cree una aplicación rest utilizando cualquier lenguaje de programación que reciba un mensaje específico y lo clasifique dependiendo de su contenido. Finalmente, este mensaje se guardará en una base de datos.

## Caso de aplicación

Cuando se crea una aplicación que recibe mensajes, resulta tedioso tener que reconocer el objetivo por el cual fueron escritos. Esta aplicación busca solucionar esto, utilizando una instancia de Watson Assistant para reconocer el contenido de un mensaje y clasificarlo acordemente. En este caso, se define una app que recibe mensajes de clientes hacia un banco. Al recibirse el mensaje, se verificará que el cuerpo del mismo contiene todos los parámetros pertinentes definidos dentro de la aplicación. Asimismo, se verificará que los tipos y valores sean los correctos.
Una vez validado el mensaje recibido, se pasará a clasificarlo utilizando la api de Watson Assistan la cuál, una vez envíado el mensaje con un request, responderá con una de tres intenciones:

* Cambio de clave
* Adelanto de sueldo
* Transferencia erronea

Una vez identificada la intención (siempre y cuando se tenga un 75% de certeza de que es la obtenida) se clasificará el mensaje y se guardará en una base de datos db2 en la cloud de ibm.

## Flujo del programa






