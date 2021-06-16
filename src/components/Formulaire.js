import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Formulaire({cart}) {
    
    const { register, handleSubmit, formState: {errors}} = useForm();

   function submit(data, e) { 
        // Pour empêcher le formulaire d'envoyer les données par défaut sans validation préalable
        e.preventDefault();
        //Récupération des valeurs entrées par l'utilisateur
        let contact = { 
            firstName: data.firstname,
            lastName: data.lastname,
            address: data.address,
            city: data.city,
            email: data.email
        };
        //Récupération des données du panier - id des produits commandés - sous forme de tableau de strings
        let products = cart.map(item => item._id);
        let order = {contact, products};
        console.log(order);
        //Fonction pour envoyer les données du formulaire ainsi que la liste des id des produits commandés via une API fetch POST - fichier queries.js -*/
        sendForm(order);
    } 
    function sendForm(data) {   
        fetch("http://localhost:3000/api/cameras/order", {
               method: "POST",
               headers: {
               "Content-Type": "application/json"
               },
               body: JSON.stringify(data)
               })
               .then(response => response.json())
               .then(response => {
                   console.log(response);
                   storeDataOrder(response); 
               })
               .catch(error => alert("Erreur : " + error));
    }

    function storeDataOrder(data) {
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("orderName", data.contact.firstName);
        // Renvoie vers la page de confirmation de commande, avec le prix total mis en mémoire dans le paramètre url
        const totalCart = cart.reduce(function(total, item) {
            return total + item.price * item.quantity / 100;
        }, 0); 
        window.location.href = "/confirmation?price=" + totalCart;
    }

    return (
        <Form className="infos__form" onSubmit={handleSubmit((data, e) => { submit(data, e) })}>
            <Form.Group className="nom">
                <Form.Label htmlFor="firstname">Prénom</Form.Label>
                <Form.Control {...register("firstname", {required: true, minLength:3, pattern:/[A-Za-z]{3}/})} type="text" placeholder="Par exemple Paul" id="firstname"/>
                {errors.firstname && errors.firstname.type === 'required' && <p>Vous devez obligatoirement entrer votre prénom.</p>}
                {errors.firstname && errors.firstname.type === 'pattern' && <p>Votre prénom ne doit comporter que des lettres.</p>}
                {errors.firstname && errors.firstname.type === 'minLength' && <p>Votre prénom est trop court.</p>}
                <Form.Label htmlFor="lastname">Nom</Form.Label>
                <Form.Control {...register("lastname", {required: true, minLength:3, pattern:/[A-Za-z]{3}/})} type="text" placeholder="Par exemple Lavigne" id="lastname"/>
                {errors.lastname && errors.lastname.type === 'required' && <p>Vous devez obligatoirement entrer votre nom.</p>}
                {errors.lastname && errors.lastname.type === 'pattern' && <p>Votre nom ne doit comporter que des lettres.</p>}
                {errors.lastname && errors.lastname.type === 'minLength' && <p>Votre nom est trop court.</p>}
            </Form.Group>

            <Form.Group className="adresse">
                <Form.Label htmlFor="address">Adresse :</Form.Label>
                <Form.Control {...register("address", {required: true, minLength:3})} type="text" placeholder="Par exemple 12 rue des Ifs" id="address"/>
                {errors.address && errors.address.type === 'required' && <p>Vous devez obligatoirement entrer votre adresse.</p>}
                {errors.address && errors.address.type === 'minLength' && <p>Votre adresse est trop courte.</p>}
                <Form.Label htmlFor="city">Ville :</Form.Label>
                <Form.Control {...register("city", {required: true, minLength:3, maxLength:20, pattern:/[A-Za-z]{3}/})} type="text" placeholder="Par exemple Lyon" id="city"/>
                {errors.city && errors.city.type === 'required' && <p>Vous devez obligatoirement entrer votre ville.</p>}
                {errors.city && errors.city.type === 'pattern' && <p>Votre nom de ville ne doit comporter que des lettres.</p>}
                {errors.city && errors.city.type === 'minLength' && <p>Votre nom de ville est trop court.</p>}
            </Form.Group>

            <Form.Group>                       
                <Form.Label htmlFor="email">Email :</Form.Label>
                <Form.Control {...register("email", {required: true, minLength:10, maxLength:30, 
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })} type="text" placeholder="Par exemple paul.labiche@sfr.fr" id="email"/>
                {errors.email && <p>Ceci n'est pas une adresse mail !</p>}
            </Form.Group>
            <Button variant="primary" type="submit" >
                Envoyer
            </Button>
        </Form> 
    );
}

export default Formulaire;

