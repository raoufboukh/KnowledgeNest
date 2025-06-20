import Image from "next/image";
import React from "react";
import { MdLocationOn } from "react-icons/md";

const About = () => {
  return (
    <section className="py-20 bg-accent-2">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-2xl"></div>
            <Image
              src="/assets/about.png"
              alt="À propos de nous"
              width={600}
              height={400}
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-primary text-2xl" />
                <div>
                  <div className="font-bold text-gray-800">Algérie</div>
                  <div className="text-sm text-gray-600">
                    Partout dans le pays
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Notre <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Bienvenue chez <strong>KnowledgeNest Cars</strong>, votre
                destination de référence pour tout ce qui concerne l'automobile
                en Algérie. Nous nous engageons à vous offrir la meilleure
                sélection de véhicules, un service client exceptionnel et une
                expérience d'achat de voiture sans faille.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Notre équipe d'experts passionnés d'automobiles est là pour vous
                aider à trouver le véhicule parfait qui correspond à vos besoins
                et à votre budget. Que vous recherchiez une voiture neuve ou
                d'occasion, nous avons un large éventail d'options parmi
                lesquelles choisir.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chez KnowledgeNest Cars, nous croyons en la transparence et
                l'intégrité. Nous nous efforçons de rendre votre parcours
                d'achat automobile aussi fluide que possible, en veillant à ce
                que vous quittiez notre concession avec le sourire.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-primary text-white px-6 py-3 rounded-full font-semibold">
                ✓ Garantie qualité
              </div>
              <div className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
                ✓ Prix compétitifs
              </div>
              <div className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold">
                ✓ Service après-vente
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
