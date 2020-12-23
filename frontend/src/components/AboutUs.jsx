import React from "react";

const AboutUs = () => {
  return (
    <div className="col-sm-12 col-md-6 p-5 mb-5 mt-5 mx-auto rounded shadow">
      <h1>O nama</h1>
      <p>
        Tech Neeks je onlajn prodavnica za prodaju tehničke robe po nabolje
        mogućem kvalitetu. Tech Neeks omogućuje brzu i laku kupovinu
        najpopularnije tehničke robe sa tržišta kao i dostavu širom Srbije.
      </p>
      <p>
        Tehnička podrška:
        <br /> Broj telefona: +381 69 345 234 <br /> Radno vreme:
        <br /> Ponedeljak - Petak: od 08:00 do 20:00
        <br />
        Subota: od 08:00 do 17:00 Nedelja: neradni dan
      </p>
      <p>
        Radno vreme prodavnica:
        <br />
        Ponedeljak - Petak: od 08:00 do 20:00
        <br />
        Subota: od 08:00 do 17:00
        <br />
        Nedelja: neradni dan
      </p>
      <p>
        Prodavnice:
        <br />
        Blok 22, Beograd
        <br />
        Bulevar kralja Aleksandra 152, Beograd
      </p>

      <iframe
        className="mx-auto"
        title="Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5661.156112220827!2d20.426158282272393!3d44.809787058468125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a655f9d196383%3A0xc72bc5a6aad4610c!2z0JHQu9C-0LogMjIsIEJlbGdyYWRl!5e0!3m2!1sen!2srs!4v1605733525785!5m2!1sen!2srs"
        style={{
          width: "100%",
          height: 450,
          frameborder: 0,
          style: "border:0;",
          allowfullscreen: "",
          ariaHidden: false,
          tabindex: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}></iframe>
    </div>
  );
};

export default AboutUs;
