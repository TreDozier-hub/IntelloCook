import React from "react";
import Header from "./components/Header.js";
import Image_1 from "./assets/machine-01.png";
import Image_2 from "./assets/logo.png";
import "./components/Accueil.css";


function App() {
  return (


    <div className="App">
      <header className="App-header">
        <>
          <Header />
        </>
      </header>

      <main>

        <div class="container">

          <section class="section-1">

            <div class="imageGauche">
              <img src={Image_1} alt="Robot Cuisine" class="robot-image" />
            </div>

            <div class="logoAccueil">
              <img src={Image_2} alt="Logo IntelliCook" class="logo2" />
              <h1 class="sousTitre">Des recettes faciles <br /> pour cuisiner Simplement</h1>
              <hr className="separator" />
              <p class="description">
                Notre plateforme vous permettra d’avoir un choix illimité de recettes en fonction des ingrédients de votre choix.
              </p>

              {/* Pas encore de lien derriere */}
              <button class="buttonRecette">Commencer</button>
              <br />
              <br />
            </div>
          </section>

          <section class="section-2">
            
          </section>

        </div>

        

      </main>

      <footer>

      </footer>

    </div>




  );
}

export default App;
