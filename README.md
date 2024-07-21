## Installation

Installer PostgreSQL 15 sur https://www.postgresql.org/download/ 

Ajouter tous les composants proposés par l'installer. Si vous avez déjà installé PosgreSQL, assurez vous d'avoir pgAdmin4.

Connectez vous à vous serveur Postgres avec vos identifiants personnels ou pré-définis par PostgreSQL. 

Orientez vous sur la documentation officielle PostgreSQL en cas de problème d'authentification ou autres.

Créez la base de donnée "ascension".

Créer un fichier .env à la racine du projet. Recopier le contenu du fichier .env.example, changez les valeurs des variables en fonction de vos identifiants PostgreSQL.

Pour remplir votre variable de JWT, écrire la commande suivante :

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Copier coller le résultat obtenu en valeur de votre variable JWT.

Installer MongoDB sur https://www.mongodb.com/try/download/community

Lorsque demandé, installer MongoDB avec MongoD en service.

De même pour Compass.

Avec Compass, connectez vous avec les identifiants pré remplis.

Créer une nouvelle base de données "ascension"

Faire un npm install à la racine du projet

```bash
npm install
```

Démarrer le serveur avec

```bash
npm start
```

Si vous avez démarré l'interface web avant : vous pouvez désormais utiliser la totalité des fonctions du projet.
Sinon, démarrez l'interface web.





