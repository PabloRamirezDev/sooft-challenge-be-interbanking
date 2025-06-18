# SOOFT Challenge BE - Interbanking (Cloud)

## Explicación

En el diseño propuesto, esta función lambda sería invocada desde un endpoint de API Gateway, para luego publicar los datos de la nueva empresa a adherir en una cola de SQS. Esto permitiría una integración más desacoplada con la base de datos, puesto que el servidor (u otro servicio) podría ser el encargado de almacenar la nueva empresa en la base de datos. Por ejemplo, el servidor de Nest.js podría hacer polling a la cola de SQS utilizando un Interval, para finalmente almacenar la información.

## Código de la función

El código de la función Lambda se puede encontrar en el archivo [handler.ts](./handler.ts).

## Inputs y Outputs

El formato de los inputs y outputs presentados está pensado para la integración de la Lambda con API Gateway.

- [Input válido](./input.json)
- [Output exitoso](./output-success.json)
- [Output fallido (error en la solicitud)](./output-bad-request.json)
- [Output exitoso (error interno)](./output-internal-server-error.json)