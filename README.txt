Instrucciones de Uso:

#1 Descomprimir el Archivo .rar

#2 Importar la carpeta y la solución en Visual Studio

#3 Para ejecutar el Backend ejecute la solución en Visual Studio

#4 Instale el Frontend usando `npm install` en una temrinal

#5 Ejecute el Frontend usando `ng serve --open` o `npm start` en una terminal
En la problemática planteada el cliente tenía un requisito de un CMS para controlar jerarquías
presentadas de la siguiente manera:

1. A
	1.1 Sub A
		1.1.1 Tem A
2 B
	2.1 Sub B
		2.1.1 Tem B

Para ello se realizó una solución con el entorno Visual Studio por su compatibilidad la cual consiste en:

-Una base de datos en SQLite embebida por su sencillez de uso y portabilidad
-Un Backend realizado en C# utilizando .Net Core Api versión 6.0
-Un Frontend para consumir los servicios de la API realizado en Angular versión 14.2.0

Utilizando esta arquitectura el cliente puede leer, insertar, actualizar el estado y borrar elementos a su conveniencia

Las reglas de la arquitectura son:

1. CRUD
2. Inhabilitar elementos
3. Eliminar nodos vacíos

1. Para el primer elemento usando la API se crearon modelos que contienen los objetos y Servicios que
contienen los Controladores para permitir el CRUD

2. Para tener un control de los elementos y su visibilidad se añadió una columna auxiliar a la base de datos
llamada "active" para permitir su control de disponibilidad

3. Para el tercer inciso se creó una regla en la base de datos usando claves foráneas que impiden que
los elementos puedan ser borrados si hay elementos hijos que dependen de estos, permitiendo a su vez
la flexibilidad requerida de que los elementos sin hijos puedan ser borrados in mayor problema