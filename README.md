# FashionDays

Курсов проект

Дисциплина: Проектиране и интегриране на софтуерни системи

Фаза 3: Реализация на системата

Версия 1.0


### Фак. №	   Име на студент	  Секция от документа
    61934	   Мария Чолакова	      2,4,6
    61927	   Петя Соколова	      2,3,5
    61871	   Роксана Янева	      1,3,5

Януари, 2019


Съдържание
1. Въведение	3
  * Цел	3
  *	Резюме	3
  *	Дефиниции и акроними	3
2.	Използвани технологии	4
3.	Реализация на базата от данни	5 
4.	Реализация на бизнес логиката	6
5.	Реализация на потребителския интерфейс	7
6.	Внедряване на системата	8
7.	Разпределение на дейностите по реализацията	9




## Въведение
1. Цел

Целта на документа е да опише програмната реализация на системата FashionDays. Тя представлява онлайн магазин за дрехи, който има следните функционалности: създаване на потребителски профил, добавяне на дрехи в  пазарска количка, изпълняване на онлайн поръчки, търсене на продуктите, чат стая и помощ за клиента.

2. Резюме

Документът описва използваните технологии, реализацията на базата данни, бизнес логиката и потребителския интерфейс. Накрая са описани стъпките за внедряването на онлайн системата.

3. Дефиниции и акроними

Дефинирайте всички термини, понятия и акроними, използвани в документа.



## Използвани технологии

  Системата има стандартаната трислойна архитектура MVC. Това се вижда още от разпрелението на файловете в три основни директории - static_content(View), app_server(Controller) и db_server(Model). Системата е разпределена, понеже отделните й части си говорят по мрежата. Имаме 3 вида комуникация - 1) HTTP заявки между клиента(статичните файлове) и сървъра на системата; 2) комуникация чрез WebSocket за получаване на незабавен отговор от сървъра и 3) peer-to-peer пример с видео чат, в който различни клиенти си говорят директно без да се свързват със сървъра.
  Системата може да се деплойне на Docker контейнери, понеже сме предоставили необходимите конфигурационни файлове за това. За реализацията на back end частта е използван NodeJS. Front end частта на приложението е реализарана със следните програмни езици - HTML, CSS, Javascript и библиотеката JQuery. Приложението представлява Single Page Application. За направата на модалните диалози в приложението е използван Bootstrap. Handlebars семантични шаблони са използвани на HTML страницата.

## Реализация на базата от данни 

Системата използва MySQL база данни. Информацията се съхранява в база данни, наречена fashiondb, която е съставена от две таблици - customers и products. В customers се пазят всички регистрирани потребители, а в products - продуктите, които онлайн магазинът предоставя. 


Структурата на двете таблици products и customers е следната:



# Реализация на бизнес логиката
Съръвърът е имплементиран на NodeJs. За получаването на HTTP заявките сме използвали фреймуърка **express**. Комуникацията между клиента и сървъра спазва REST конвенциите. Сървърът ползва фукциите от още няколко js библиотеки:

    1. mysql -  за осъщесътвяване на връзка с базата данни
    2. body-parser  - за извличане на параметрите на PUT и POST заявките от тялото им 
    3. cors  - позволява клиенти с домейн, различен от този на сървъра, да достъпват ресурсите на сървъра
    4. util - за използването на promises, вместо callbacks
    5. sha1 -  за хеширането на паролата на потребителя


## Реализация на потребителския интерфейс

За създаването на потребителския интерфейс са използвани HTML, CSS и Javascript. Всички файлове, които реализират интерфейса се намират в папката static_content. Интерфейсът е ясен и лесноизползваем и не изисква предварително запознаване със системата.

Сайтът се състои от заглавна страница, откъдето може да се осъществи достъп до страницата за логване и регистрация на потребител. Също така, от там може да се достъпи страницата с често задавани въпроси и техните отговори, общите условия, контакти, допълнителна информация и т.н. Сайтът предоставя и чат стая, в която всеки посетител може да комуникира с другите клиенти, които са онлайн. Не на последно място, потребителите могат да видят какво са добавили в своята количка и след това да направят поръчка.

Сайтът предоставя и изглед на най-актуалните селекции, като ги разделя на две категории: за мъже и жени. На заглавната страница има поле за търсене, в което потребителят може да въведе името на някой продукт за директен достъп до него. След като е харесал даден артикул, потребителят може да натисне върху неговото изображение, за да получи пълна информация за продукта и ако реши да го поръча, първо трябва да го добави в своята количка.

Заявките, които прави клиентът, се изпращат до сървъра, който ги обработва и ако е нужно, прави връзка и с базата данни. Ако настъпи грешка, породена от нарушена връзка в мрежата или срив в сървъра или в базата данни, потребителят ще бъде информиран със съобщение за грешка, оказващо какъв точно е проблемът.



## Внедряване на системата
За успешното инсталиране и подкарване на системата е нужно при местата на свързване да се окажат правилно адресите на отделните й части, за да се осъществи връзката между тях. 

     - Връзката Клиент-Сървър се осъщесътвява във файла request.js(в static_content), където променливата appServerAddress държи местонахождението на сървъра.
     
     - Връзката Сървър-База данни се осъщесътвя във файла server.js(в app_server) и по-точно във функцията createPool.
   
   #### Внедряване върху Docker контейнери
  
Всяка от трите основни директории съдържа свой Dockerfile, който определя имиджа на контейнера и се грижи да инсталира модулите, от които ще има нужда контейнера(dependencies). В бащината директория се намира docker-compose.yml файлът, който построява контейнерите по съответния им Dockerfile. В docker-compose.yml файла портовете за контейнерите аpp_server и static_content са 'map'-нати към портове на хост машината, например "8088:80" при app_server. Това означава, че вътре в контейнера сървърът чака на порт 80, който се bind-ва към порт 8088 на хост машината. Тоест ако от хост машината пратим заявка през браузъра до "localhost:8088/allproducts" ще може да видим продуктите от базата данни. Също така за по-голяма гъвкавост docker-compose.yml файла ползва environment променливи, които се виждат от контейнерите. Например може да парамеризираме името на базата, user-a на базата и паролата му, да ги подадем на server контейнера и той да ги ползва, за да осъществи връзката с базата. Тези променливи са указани във файла .env. За стартирането на системата на Dokcer контейнери е необходимо въвеждането на командата **docker-compose -f docker-compose.yml up** и готово!


## Разпределение на дейностите по реализацията
Опишете дейностите, които всеки член на екипа е извършил при реализацията на системата

