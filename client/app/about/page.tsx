"use client";
import { stats, features, team } from "@/components/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdVerified } from "react-icons/md";
import About from "@/components/about/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              À Propos de{" "}
              <span className="text-accent">KnowledgeNest Cars</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
              Votre partenaire de confiance pour l'achat et la vente de
              véhicules en Algérie
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: any, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4 text-primary text-4xl">
                  {React.createElement(stat.icon)}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pourquoi nous <span className="text-primary">choisir ?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les avantages qui font de KnowledgeNest Cars le leader
              du marché automobile en Algérie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, index: number) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {React.createElement(feature.icon, {
                    className: feature.iconClass || "text-primary text-4xl",
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent-2">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Notre <span className="text-primary">Équipe</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rencontrez les experts passionnés qui vous accompagnent dans votre
              projet automobile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="w-30 h-30 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
                      <MdVerified />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Notre Vision</h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Devenir la première plateforme automobile digitale en Algérie, en
              révolutionnant la façon dont les Algériens achètent et vendent
              leurs véhicules. Nous aspirons à créer un écosystème transparent,
              efficace et accessible à tous.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="opacity-80">
                  Technologies de pointe pour une expérience utilisateur
                  optimale
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">Confiance</h3>
                <p className="opacity-80">
                  Relations durables basées sur la transparence et l'honnêteté
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="opacity-80">
                  Amélioration continue de nos services et de notre qualité
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Prêt à trouver votre voiture idéale ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui ont trouvé leur
            véhicule parfait avec KnowledgeNest Cars
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/cars"}
              className="bg-primary border-2 border-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-2 hover:text-primary transition-all duration-300  shadow-lg hover:shadow-xl"
            >
              Parcourir les voitures
            </Link>
            <Link
              href={"/sell-cars"}
              className="bg-accent-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Vendre ma voiture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
