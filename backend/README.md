# Back-end

Περιεχόμενα:

- Πηγαίος κώδικας εφαρμογής για εισαγωγή, διαχείριση και
  πρόσβαση σε δεδομένα (backend).
 
 Δημιουργήσαμε ένα virtual machine Ubuntu 18.04 server στο Azure. Σε αυτό εκτελείται η εφαρμογή μας και πιο συγκεκριμένα είναι προσβάσιμο στην διεύθυνση http://tollways.westeurope.cloudapp.azure.com:9103/.  Για  την προτετοιμασία του περιβάλλοντος χρειάστηκε να εγκαταστήσουμε διάφορα πακέτα για συγκεκριμένους σκοπούς το καθένα. 

Για αρχή εγκαταστούμε τη nodejs και το nmp (node packager manager): 

     sudo apt install nodejs
     sudo apt install npm

Έπειτα εγκιθαστούμε τις βιβλιοθήκες της nodejs που θα χρειαστούμε για την εφαρμογή μας:

    npm install express
    npm install body-parser
    npm install mysql

Για να ενεργοποιήσουμε modules του apache:

    sudo a2enmod proxy
    sudo a2enmod proxy_http

Για να εγκαστήσουμε τον apache:

    sudo apt install apache2 
και στο φάκελο /etc/apache2/sites-avalaible/  αντιγράφουμε το αρχείο tollways.conf
      
     cp backend/tollways.conf /etc/apache2/sites-available/


  Authors : Mitakidis Andreas, 
            Marinos Dimitris
