Aplicație Web pentru Gestionarea Rețetelor Culinare

1. Introducere
Această aplicație web este dezvoltată pentru gestionarea eficientă a rețetelor culinare personale. Aplicația permite utilizatorilor să creeze, vizualizeze, editeze și să șteargă rețete într-un mod intuitiv și elegant. Proiectul este construit folosind tehnologii moderne web și integrează servicii cloud pentru o experiență completă.

3. Descrierea Problemei
În era digitală actuală, mulți pasionați de gătit se confruntă cu provocarea organizării rețetelor lor favorite. Problema principală identificată este lipsa unei soluții centralizate, ușor de folosit, pentru:
•	Organizarea rețetelor personale - Utilizatorii au nevoie de un loc centralizat unde să-și păstreze toate rețetele
•	Accesibilitatea informațiilor - Necesitatea accesului rapid la ingrediente și instrucțiuni de preparare
•	Gestionarea eficientă - Posibilitatea de a edita, actualiza sau șterge rețete învechite
•	Interfață intuitivă - O experiență utilizator plăcută și modernă pentru navigarea prin colecție
Aplicația dezvoltată rezolvă aceste probleme prin oferirea unei platforme web complete, care permite gestionarea facilă a rețetelor culinare într-un mediu digital modern și accesibil.

5. Descrierea API
Aplicația utilizează o arhitectură RESTful cu API-ul propriu dezvoltat în Next.js, care integrează două servicii cloud principale:
Servicii Cloud Utilizate:
1.	MongoDB Atlas (Serviciu de bază de date cloud)
o	Stocare persistentă a rețetelor
o	Operațiuni CRUD complete
o	Scalabilitate automată
2.	Vercel (Serviciu de hosting și deployment)
o	Hosting aplicației web
o	Deployment automat din Git
o	CDN global pentru performanță optimă
Structura API-ului:
Endpoint principal: /api/recipes
Operațiuni suportate:
•	GET - Obținerea rețetelor
•	POST - Crearea de rețete noi
•	PUT - Actualizarea rețetelor existente
•	DELETE - Ștergerea rețetelor
4. Fluxul de Date
Metode HTTP și Funcționalități:
GET /api/recipes
Descriere: Obține lista tuturor rețetelor sau o rețetă specifică
Exemple de Request:
# Obține toate rețetele
GET /api/recipes
Accept: application/json

# Obține o rețetă specifică
GET /api/recipes?id=64f5e8a9d4c2b1a8e9f3d2c1
Accept: application/json
Exemple de Response:
// Lista de rețete
[
  {
    "_id": "64f5e8a9d4c2b1a8e9f3d2c1",
    "title": "Papanași cu smântână",
    "description": "Desert tradițional românesc...",
    "ingredients": ["făină", "ouă", "lapte", "zahăr"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]

// Rețetă individuală
{
  "_id": "64f5e8a9d4c2b1a8e9f3d2c1",
  "title": "Papanași cu smântână",
  "description": "Amestecați făina cu ouăle...",
  "ingredients": ["făină", "ouă", "lapte", "zahăr"],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
POST /api/recipes
Descriere: Creează o rețetă nouă
Exemplu de Request:
POST /api/recipes
Content-Type: application/json

{
  "title": "Ciorbă de burtă",
  "description": "Se pune burta la fiert cu...",
  "ingredients": ["burtă de vită", "ceapă", "morcov", "smântână"]
}
Exemplu de Response:
{
  "message": "Rețeta a fost creată cu succes",
  "recipeId": "64f5e8a9d4c2b1a8e9f3d2c2"
}
PUT /api/recipes?id={recipeId}
Descriere: Actualizează o rețetă existentă
Exemplu de Request:
PUT /api/recipes?id=64f5e8a9d4c2b1a8e9f3d2c1
Content-Type: application/json

{
  "title": "Papanași cu smântână și dulceață",
  "description": "Descriere actualizată...",
  "ingredients": ["făină", "ouă", "lapte", "zahăr", "dulceață"]
}
Exemplu de Response:
{
  "message": "Rețeta a fost actualizată"
}
DELETE /api/recipes?id={recipeId}
Descriere: Șterge o rețetă
Exemplu de Request:
DELETE /api/recipes?id=64f5e8a9d4c2b1a8e9f3d2c1
Exemplu de Response:
{
  "message": "Rețeta a fost ștearsă"
}
Autentificare și Autorizare
În versiunea actuală, aplicația nu implementează autentificare, fiind concepută pentru uz personal. Totuși, serviciile cloud utilizate sunt securizate:
•	MongoDB Atlas: Conexiune securizată prin string de conexiune cu credențiale
•	Vercel: Deployment securizat prin integrarea Git și variabile de mediu
Fluxul Complet de Date:
1.	Utilizatorul interactionează cu interfața web (React/Next.js)
2.	Frontend-ul trimite cereri către API-ul local (/api/recipes)
3.	API-ul procesează cererea și se conectează la MongoDB Atlas
4.	Baza de date returnează rezultatul către API
5.	API-ul formateaza răspunsul și îl trimite către frontend
6.	Frontend-ul actualizează interfața cu noile date

Concluzie
Aplicația dezvoltată oferă o soluție completă și modernă pentru gestionarea rețetelor culinare, integrând servicii cloud pentru o experiență robustă și scalabilă. Prin utilizarea tehnologiilor moderne și a unei arhitecturi RESTful, aplicația asigură o experiență utilizator excelentă și o performanță optimă.


