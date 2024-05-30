import "./App.css";

// import { circolari } from "./convitto_circolari.js";
// // import { pon } from "./convitto_pon.js";
// import { bacheca } from "./convitto_bacheca.js";
// import { documenti } from "./convitto_documenti.js";
import { bandi } from "./filippo_bandi.js";
// import { albi } from "./convitto_albi.js";


import XMLCircolari from "./santacroce_pon2.xml";
import XMLMediaVecchi from "./santacroce_media.xml";
// import XMLMediaNuovi from "./molfetta_media_nuovi.xml";

// import albihtml from "./albi.html"
import React from "react";

import axios from "axios";
import moment from "moment";

import "moment/locale/it";

function App() {
  const [xmlNews, setXmlNews] = React.useState("");
  const [xmlMediaVecchi, setXmlMediaVecchi] = React.useState("");
  const [xmlMediaNuovi, setXmlMediaNuovi] = React.useState("");
  const [xmlCircolari, setXmlCircolari] = React.useState("");
  const [xmlMediaImport, setXmlMediaImport] = React.useState("");

  const [arrCompleto, setArrayCompleto] = React.useState([]);

  function createItemsFromArray(array) {
    let items = "";
    let controll = [];

    array.forEach((obj, index) => {
     
      // const date = moment(obj['date'], "DD MMMM YYYY").add(12, 'hours').subtract(index, 'minutes').format(
      //   "ddd, DD MMM YYYY HH:mm:ss Z"
      // );
      const date = moment(obj['date'], "YYYY-MM-DD HH:mm:ss").format(
        "ddd, DD MMM YYYY HH:mm:ss Z"
      );

      const date2 = moment(obj['date'], "YYYY-MM-DD HH:mm:ss").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const date3 = moment(obj['date'], "YYYY-MM-DD HH:mm:ss").format(
        "DD-MM-YYYY"
      );
// const num = obj.title.match(/\d+/g)[0]

// Se ci sono almeno tre numeri nella stringa, prendiamo i primi tre

      const mediaString = () => {
        let Fstring = "";
        obj.media.map((el) => {
          var stringg = "";
          stringg = `i:${+el.id};s:${el.num}:"${el.guid}";`;
          Fstring += stringg;
        });
        return Fstring;
      };
      const linkString = () => {
        let Fstring = "";
        obj.media.map((el) => {
          var stringg = "";
          stringg = `<a href="${el.guid}">${el.guid}</a>
          <br></br>`;
          Fstring += stringg;
        });
        return Fstring;
      };
      const categories = () => {
        let categoryTags = ""; // Inizializza una stringa vuota

        const parser = new DOMParser();

        obj.category.forEach((el) => {
          let cat = `<category domain="tipologia-progetto" nicename="${generaNiceName(el)}"><![CDATA[${el}]]></category>`;
          // switch (el) {
          //   case "Docenti":
          //   case "Personale ATA":
          //     cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category>`;
          //     break; // Aggiungi il break per terminare il caso
          //   case "Genitori":
          //   case "Studenti":
          //     cat = `<category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
          //     break; // Aggiungi il break per terminare il caso
          //   default:
          //     // cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category><category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
          //     break;
          // }

          if (cat) {
            const categoryDoc = parser.parseFromString(cat, "text/xml");
            categoryTags += categoryDoc.querySelector("category").outerHTML; // Aggiungi il tag XML alla stringa
          }
        });

        return categoryTags;
      };

      const item = `


      <item>
      <title><![CDATA[${obj.title}]]></title>
         
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
  
      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>

      <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
  
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[scheda_progetto]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
    ${categories()}
    <category domain="post_tag" nicename="pon"><![CDATA[PON]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_descrizione]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj.title}]]></wp:meta_value>
      </wp:postmeta>
      <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_is_luogo_scuola]]></wp:meta_key>
      <wp:meta_value><![CDATA[true]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_posizione_gps_luogo_custom]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:2:{s:3:"lat";s:0:"";s:3:"lng";s:0:"";}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_is_realizzato]]></wp:meta_key>
      <wp:meta_value><![CDATA[false]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_timestamp_inizio]]></wp:meta_key>
      <wp:meta_value><![CDATA[1388534400]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_timestamp_fine]]></wp:meta_key>
      <wp:meta_value><![CDATA[1609286400]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_scheda_progetto_anno_scolastico]]></wp:meta_key>
      <wp:meta_value><![CDATA[2023]]></wp:meta_value>
      </wp:postmeta>
               
      </item>   


     

     
      `;

      items += item;
    });
    console.log(controll);
    return items;
  }
  // <wp:postmeta>
  // <wp:meta_key><![CDATA[_dsi_documento_file_documenti]]></wp:meta_key>
  // <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
  // </wp:postmeta>
           

  function generaNiceName(testo) {
    // Rimuovi spazi e caratteri non desiderati
    var niceName = testo
      ? testo
          .toLowerCase() // Converti tutto in minuscolo
          .replace(/\s+/g, "-") // Sostituisci gli spazi con trattini
          .replace(/[^a-z0-9-]/g, "") // Rimuovi caratteri non alfanumerici tranne trattini
      : "";
    return niceName;
  }

  // function parseXmlCircolari(xmlCircolari) {
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(xmlCircolari, "text/xml");
  //   const items = xmlDoc.querySelectorAll("item");

  //   const parsedItems = [];
  //   let resultString = "";

  //   for (const item of items) {
  //     // const category = item.querySelector("category[nicename='area-riservata']");

  //     // if(category)
  //    { const title = item.querySelector("title").textContent;
  //     const guid = item.querySelector("guid").textContent;
  //     const numberMatch = title.match(/\d+/);
  //     const number = numberMatch ? numberMatch[0] : "";

  //     // const pubDate = item.querySelector("pubDate").textContent;

  //     // const contentEncoded = item.querySelector("content").textContent;
  //     // const pTags = contentEncoded.match(/<p>(.*?)<\/p>/g);
  //     // const content = pTags
  //     //   ? pTags.map((pTag) => pTag.replace(/<\/?p>/g, "")).join(" ")
  //     //   : "";

  //     // const allegati = [];
  //     // const regex = /"id":(\d+),"href":"([^"]+)"/g;

  //     // const content2 = contentEncoded;
  //     // let match;
  //     // while ((match = regex.exec(content2)) !== null) {
  //     //   const id = match[1];
  //     //   let href = match[2];

  //     //   href = href.replace(
  //     //     "www.giordanidesanctis.edu.it",
  //     //     "giordanidesanctis.3dsolution.it"
  //     //   );

  //     //   // Conta il numero di lettere nell'href
  //     //   const numLetters = href.length;
  //     //   let str = numLetters;

  //     //   allegati.push({ id, href, str });
  //     // }

  //     resultString += `<strong>${title}</strong><br>`;
  //     resultString += `<a href="${guid}">${guid}</a><br><br>`;

  //     parsedItems.push({
  //       title,
  //       guid,
  //       // number,
  //       // pubDate,
  //       // content,
  //       // allegati,
  //     });}
  //   }

  //   return resultString;
  // }
  function estraiNumeroCircolare(testo) {
    // Crea una regex per cercare una o più cifre consecutive all'inizio della stringa
    const regex = /(\d{1,3})/;

    // Esegui la ricerca nella stringa
    const risultato = testo.match(regex);

    // Verifica se è stato trovato un numero
    if (risultato) {
      // Il numero è nella prima posizione dell'array risultato
      const numeroCircolare = risultato[1];
      return numeroCircolare;
    } else {
      // Nessun numero trovato
      return null;
    }
  }
  function capitalizeString(inputString) {
    // Assicurati che la stringa non sia vuota o null
    if (!inputString) {
      return "";
    }

    // Converti la stringa in minuscolo
    const lowercaseString = inputString.toLowerCase();

    // Capitalizza la prima lettera
    const capitalizedString =
      lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);

    return capitalizedString;
  }
  const [data, setData] = React.useState([]);

  // Esempio di utilizzo
  // axios
  //   .get(XMLCircolari, {
  //     "Content-Type": "application/xml; charset=utf-8",
  //   })
  //   .then((response) => {
  //     setXmlCircolari(response.data);
  //     // const parsedCircolari = parseXmlCircolari(response.data);
  //     // console.log(parsedCircolari);
  //   });

  React.useEffect(() => {
    axios
      .get(XMLCircolari, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlCircolari(response.data);
      });
    axios
      .get(XMLMediaVecchi, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlMediaVecchi(response.data);
      });
    // axios
    //   .get(XMLMediaNuovi, {
    //     "Content-Type": "application/xml; charset=utf-8",
    //   })
    //   .then((response) => {
    //     // const parsedCircolari = parseXmlCircolari(response.data);
    //     // console.log(parsedCircolari);
    //     setXmlMediaNuovi(response.data);
    //   });

    // axios
    // .get( XMLMediaImpoert, {
    //   "Content-Type": "application/xml; charset=utf-8",
    // })
    // .then((response) => {
    //   // const parsedCircolari = parseXmlCircolari(response.data);
    //   // console.log(parsedCircolari);
    //   setXmlMediaImport(response.data);
    // });
  }, []);

  React.useEffect(() => {
    if (xmlCircolari && xmlMediaVecchi) {
      const parsedCircolari = parseXmlCircolari(xmlCircolari, xmlMediaVecchi);
      setData(parsedCircolari);
      console.log(parsedCircolari);
    }
  }, [xmlCircolari, xmlMediaVecchi]);

  const parseXmlCircolari = (xmlCircolari, xmlMediaVecchi) => {
    const parser = new DOMParser();
    const circolariDoc = parser.parseFromString(xmlCircolari, "text/xml");
    const mediaVecchiDoc = parser.parseFromString(xmlMediaVecchi, "text/xml");

    const circolariItems = circolariDoc.querySelectorAll("item");

    const circolari = Array.from(circolariItems).map((item) => {
      const id = item.querySelector("post_id").textContent;
      const title = capitalizeString(item.querySelector("title").textContent);
      const content = item.querySelector("content").textContent;
      const date = item.querySelector("post_date").textContent;
      const mediaIds = parseMedia(id, mediaVecchiDoc);
      const categoryNodes = item.querySelectorAll("category");
      const category = Array.from(categoryNodes).map(
        (node) => node.textContent
      );
      // let result =
      // {name: 'Atti generali', nicename: 'atti-generali'}
      //   const categoryNode = item.querySelector('category');
      //   if (categoryNode) {
      //     const nicename = categoryNode.getAttribute('nicename');
      //     const name = categoryNode.textContent;
      //    result = { name, nicename };
      //     // Fai qualcosa con l'oggetto result
      //   }

      return {
        id: id,
        title: title,
        content: content,
        date: date,
        
        category: category,
        media: mediaIds,
      };
    });
    const filteredArray = circolari.filter((item) => {
      // Controlla se la categoria "Circolari" non è presente nell'array "category"
      return !item.category.includes("Circolari");
    });
    return circolari;
  };

  const parseMedia = (parentId, mediaVecchiDoc) => {
    const parser = new DOMParser();
    const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");
    const mediaNuovi = mediaNuoviDoc.querySelectorAll("item");
    const mediaItemsVecchi = mediaVecchiDoc.querySelectorAll("item");

    const mediaIds = Array.from(mediaItemsVecchi)
      .filter(
        (item) => item.querySelector("post_parent").textContent === parentId
      )
      .map((item) => ({
        id: item.querySelector("post_id").textContent,
        guid: item.querySelector("guid").textContent,
        num: item.querySelector("guid").textContent.length,
      }));

    return mediaIds;
  };
  // const parseMedia = (parentId, mediaVecchiDoc) => {
  //   const parser = new DOMParser();
  //   const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");
  //   const mediaNuovi = mediaNuoviDoc.querySelectorAll("item");
  //   const mediaItemsVecchi = mediaVecchiDoc.querySelectorAll("item");
  
  //   const mediaIds = Array.from(mediaItemsVecchi)
  //     .filter(
  //       (item) => item.querySelector("post_parent").textContent === parentId
  //     )
  //     .map((item) => {
  //       const postId = item.querySelector("post_id").textContent;
  //       if (Array.from(mediaNuovi).some(el => el.querySelector("post_id").textContent === postId)) {
  //         return {
  //           id: postId,
  //           guid: item.querySelector("guid").textContent,
  //           num: item.querySelector("guid").textContent.length,
  //         };
  //       } else {
  //         return null; // Non ritorna nulla se non esiste un corrispondente post_id in mediaNuovi
  //       }
  //     })
  //     .filter(item => item !== null); // Filtra gli elementi null
  
  //   return mediaIds;
  // };
  
  

  

  const fetchAndSetMediaData = async () => {
    const parser = new DOMParser();
    const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

    const updatedData = await Promise.all(
      bandi.map(async (circolare) => {
        const mediaAtt = circolare.attachments;
        const mediaObjects = await Promise.all(
          mediaAtt.map(async (mediaTit) => {
            const mediaItem = Array.from(
              mediaNuoviDoc.querySelectorAll("item")
            ).find((item) => {
              const title = item.querySelector("title").textContent
              return title.includes(mediaTit.slice(0, -5))
            });

            if (mediaItem) {
              const guid = mediaItem.querySelector("guid").textContent;
              const num = guid.length;
              const id = mediaItem.querySelector("post_id").textContent;

              return {
                id: id,
                guid: guid,
                num: num,
              };
            }

            return null;
          })
        );

        const validMediaObjects = mediaObjects.filter((media) => media !== null);

        return {
          ...circolare,
          media: validMediaObjects,
        };
      })
    );

    setData(updatedData);
    return updatedData;
  };

  // const fetchAndSetMediaData = async () => {

  //   const parser = new DOMParser();
  //   const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

  //   const updatedData = await Promise.all(
  //     circolari.map(async (circolare) => {
  //       const mediaAtt = circolare.allegati;
  //       const mediaObjects = await Promise.all(
  //         mediaAtt.map(async (mediaTit) => {
  //           const mediaItem = Array.from(
  //             mediaNuoviDoc.querySelectorAll("item")
  //           ).find(
  //             (item) => item.querySelector("title").textContent === mediaTit["name"].slice(0, -4)
  //           );

  //           if (mediaItem) {
  //             const guid = mediaItem.querySelector("guid").textContent;
  //             const num = guid.length;
  //             const id = mediaItem.querySelector("post_id").textContent;

  //             return {
  //               id: id,
  //               guid: guid,
  //               num: num,
  //             };
  //           }

  //           return null;
  //         })
  //       );

  //       const validMediaObjects = mediaObjects.filter(
  //         (media) => media !== null
  //       );

  //       return {
  //         ...circolare,
  //         media: validMediaObjects,
  //       };
  //     })
  //   );

  //   setData(updatedData);
  //   return updatedData;
  // };

  return (
    <div className="App">
      <button
        onClick={() => {
          console.log(fetchAndSetMediaData());
        }}
      >
        clicca per array
      </button>

      <button
        onClick={() => {
          console.log(createItemsFromArray(data));
        }}
      >
        clicca per xml
      </button>
      {/* <Ok/> */}

      {/* Circolari */}
      {/* const item = `
      <item>
      <title><![CDATA[${obj.title}]]></title>
  
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
   
      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>


      <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>

      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[circolare]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
                      <category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>
      <category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_circolare_numerazione_circolare]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj.num}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_circolare_is_pubblica]]></wp:meta_key>
      <wp:meta_value><![CDATA[true]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_circolare_require_feedback]]></wp:meta_key>
      <wp:meta_value><![CDATA[false]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_circolare_destinatari_circolari]]></wp:meta_key>
      <wp:meta_value><![CDATA[all]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_circolare_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                </item>
             
      `; */}

      {/* 
                DOcumenti

                <item>
      <title><![CDATA[${obj.title}]]></title>
         
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
  
      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>

      <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
  
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[documento]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
      <category domain="tipologia-documento" nicename="bandi-e-gare"><![CDATA[Bandi e Gare]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_descrizione]]></wp:meta_key>
      <wp:meta_value><![CDATA[Bandi e gare]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_numerazione_albo]]></wp:meta_key>
      <wp:meta_value><![CDATA[00001/2023]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_is_amministrazione_trasparente]]></wp:meta_key>
      <wp:meta_value><![CDATA[false]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                </item> */}

      {/* NOTIZIE
   const item = `
      <item>
      <title><![CDATA[${obj.title}]]></title>
  
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>

      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>

      <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>

      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[post]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
                      <category domain="tipologia-articolo" nicename="notizie"><![CDATA[Notizie]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_articolo_descrizione]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj.title}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_articolo_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                </item>             
      `;  */}






{/* 
const item = `

<item>
<title><![CDATA[${obj.title}]]></title>

<pubDate>${date}</pubDate>

<description></description>
<content:encoded><![CDATA[
<div>
<strong>Titolo:</strong> ${obj.title}
</div>



<div>
<strong>Data:</strong> ${obj.date}
</div>
<div>
<strong>Categoria:</strong> ${obj.category}
</div>
<div>
<strong>Numero inserimento:</strong> ${obj.numero_inserimento}
</div>
<div>
<strong>Data inizio:</strong> ${obj.inizio}
</div>
<div>
<strong>Data fine:</strong> ${obj.fine}
</div>
<div>
<strong>Data rimozione:</strong> ${obj.rimozione}
</div>

${linkString()}
]]></content:encoded>
<excerpt:encoded><![CDATA[]]></excerpt:encoded>

<wp:post_date><![CDATA[${date2}]]></wp:post_date>
<wp:post_date_gmt><![CDATA[${date2}]]></wp:post_date_gmt>
<wp:post_modified><![CDATA[${date2}]]></wp:post_modified>
<wp:post_modified_gmt><![CDATA[${date2}]]></wp:post_modified_gmt>
<wp:comment_status><![CDATA[closed]]></wp:comment_status>
<wp:ping_status><![CDATA[closed]]></wp:ping_status>

<wp:status><![CDATA[publish]]></wp:status>
<wp:post_parent>0</wp:post_parent>
<wp:menu_order>0</wp:menu_order>
<wp:post_type><![CDATA[documento]]></wp:post_type>
<wp:post_password><![CDATA[]]></wp:post_password>
<wp:is_sticky>0</wp:is_sticky>
<category domain="tipologia-documento" nicename="albo-online"><![CDATA[Albo online]]></category>
<category domain="amministrazione-trasparente" nicename="bilancio-preventivo-e-consuntivo"><![CDATA[Bilancio preventivo e consuntivo]]></category>
<category domain="albo-pretorio" nicename="programmi-annuali-e-consuntivi"><![CDATA[Programmi annuali e Consuntivi]]></category>
    <wp:postmeta>
<wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
<wp:meta_value><![CDATA[1]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[delivery]]></wp:meta_key>
<wp:meta_value><![CDATA[0]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
<wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[_dsi_documento_descrizione]]></wp:meta_key>
<wp:meta_value><![CDATA[ ${obj.title}]]></wp:meta_value>
</wp:postmeta>
    
      <wp:postmeta>
<wp:meta_key><![CDATA[_dsi_documento_is_amministrazione_trasparente]]></wp:meta_key>
<wp:meta_value><![CDATA[true]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[_dsi_documento_file_documenti]]></wp:meta_key>
<wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[_dsi_documento_protocollo]]></wp:meta_key>
<wp:meta_value><![CDATA[${obj.prot}]]></wp:meta_value>
</wp:postmeta>
      <wp:postmeta>
<wp:meta_key><![CDATA[_dsi_documento_data_protocollo]]></wp:meta_key>
<wp:meta_value><![CDATA[${obj.date}]]></wp:meta_value>
</wp:postmeta>
      </item>



`; */}
    </div>
  );
}

export default App;
