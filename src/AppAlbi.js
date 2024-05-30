import "./App.css";

import { circolari } from "./convitto_eventi.js";

import XMLCircolari from "./CircolariDanteVecchie.xml";
import XMLMediaVecchi from "./mediaDante.xml";
import XMLMediaNuovi from "./convitto_media.xml";

// import albihtml from "./albi.html"
import React from "react";

import axios from "axios";
import moment from "moment";

// import "moment/locale/it";

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
      // const date =
      //   new Date(moment(obj["data"], "DD/MM/YYYY").format()) ||
      //   new Date().toUTCString();
      // const date2 = moment(obj['dataAtto'], "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss");
      // const date3 = moment(obj['dataAtto'], "DD-MM-YYYY").format("YYYY");

      const date = moment(obj['Data di registrazione'], "DD/MM/YYYY").format(
        "ddd, DD MMM YYYY HH:mm:ss Z"
      );

      const date2 = moment(obj['Data di registrazione'], "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const date3 = moment(obj['Data di registrazione'], "DD/MM/YYYY").format(
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
          let cat = "";
          switch (el) {
            case "Docenti":
            case "Personale ATA":
              cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category>`;
              break; // Aggiungi il break per terminare il caso
            case "Genitori":
            case "Studenti":
              cat = `<category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
              break; // Aggiungi il break per terminare il caso
            default:
              // cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category><category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
              break;
          }

          if (cat) {
            const categoryDoc = parser.parseFromString(cat, "text/xml");
            categoryTags += categoryDoc.querySelector("category").outerHTML; // Aggiungi il tag XML alla stringa
          }
        });

        return categoryTags;
      };

      const item = `
      <item>
      <title><![CDATA[${obj['Oggetto']}]]></title>
    
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
   
      <description></description>
      <content:encoded><![CDATA[
        <table class="tabVisalbo">
        <tbody id="dati-atto">
      <tr>
        <th>Ente titolare dell'Atto</th>
        <td style="font-style: italic;font-size: 1.5em;vertical-align: middle;">Istituto Comprensivo Statale San Giovanni Bosco</td>
      </tr>
      <tr>
        <th>Numero Albo</th>
        <td style="vertical-align: middle;">${obj['Numero Albo']}</td>
      </tr>
      <tr>
        <th>Codice di Riferimento</th>
        <td style="vertical-align: middle;">${obj['Codice di Riferimento']}</td>
      </tr>
      <tr>
        <th>Oggetto</th>
        <td style="vertical-align: middle;">${obj['Oggetto']}</td>
      </tr>
      <tr>
        <th>Data di registrazione</th>
        <td style="vertical-align: middle;">${obj['Data di registrazione']}</td>
      </tr>
      <tr>
        <th>Data inizio Pubblicazione</th>
        <td style="vertical-align: middle;">${obj['Data inizio Pubblicazione']}</td>
      </tr>
      <tr>
        <th>Data fine Pubblicazione</th>
        <td style="vertical-align: middle;">${obj['Data fine Pubblicazione']}</td>
      </tr>
      <tr>
        <th>Data oblio</th>
        <td style="vertical-align: middle;">${obj['Data oblio']}</td>
      </tr>
      <tr>
        <th>Richiedente</th>
        <td style="vertical-align: middle;">${obj['Richiedente']}</td>
      </tr>
      <tr>
        <th>Unità Organizzativa Responsabile</th>
        <td style="vertical-align: middle;">${obj['Unità Organizzativa Responsabile']}</td>
      </tr>
      <tr>
        <th>Responsabile del procedimento amministrativo</th>
        <td style="vertical-align: middle;">${obj['Responsabile del procedimento amministrativo']}</td>
      </tr>
      <tr>
        <th>Categoria</th>
        <td style="vertical-align: middle;">${obj['Categoria']}</td>
      </tr>
          <tr>
            <th>Meta Dati</th>
            <td style="vertical-align: middle;">${obj['Meta Dati']}</td>
          </tr>		<tr>
          <th>Note</th>
          <td style="vertical-align: middle;">${obj['Note']}</td>
        </tr>
         </tbody>
      </table>
      <br></br>
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
      <category domain="albo-pretorio" nicename="${generaNiceName(obj["Categoria"])}"><![CDATA[${obj["Categoria"]}]]></category>
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
      <wp:meta_value><![CDATA[${obj['Codice di Riferimento']}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_numerazione_albo]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj['Numero Albo']}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_is_amministrazione_trasparente]]></wp:meta_key>
      <wp:meta_value><![CDATA[false]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${
        obj.media.length
      }:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_protocollo]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj['Codice di Riferimento']}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_data_protocollo]]></wp:meta_key>
      <wp:meta_value><![CDATA[${date3}]]></wp:meta_value>
      </wp:postmeta>
                </item>
                 
      `;

      items += item;
    });
    console.log(controll);
    return items;
  }


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
    axios
      .get(XMLMediaNuovi, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlMediaNuovi(response.data);
      });

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

  // React.useEffect(() => {
  //   if (xmlCircolari && xmlMediaVecchi) {
  //     const parsedCircolari = parseXmlCircolari(xmlCircolari, xmlMediaVecchi);
  //     setData(parsedCircolari);
  //     console.log(parsedCircolari);
  //   }
  // }, [xmlCircolari, xmlMediaVecchi]);

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
        num: estraiNumeroCircolare(title),
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

  // const fetchAndSetMediaData = async () => {
  //   const parser = new DOMParser();
  //   const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

  //   const updatedData = await Promise.all(
  //     circolari.map(async (circolare) => {
  //       const mediaAtt = circolare.attachments;
  //       const mediaObjects = await Promise.all(
  //         mediaAtt.map(async (mediaTit) => {
  //           const mediaItem = Array.from(
  //             mediaNuoviDoc.querySelectorAll("item")
  //           ).find((item) => {
  //             const title = item.querySelector("title").textContent.slice(0, 20);
  //             return title === mediaTit.slice(0, 20);
  //           });

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

  //       const validMediaObjects = mediaObjects.filter((media) => media !== null);

  //       return {
  //         ...circolare,
  //         media: validMediaObjects,
  //       };
  //     })
  //   );

  //   setData(updatedData);
  //   return updatedData;
  // };

  const fetchAndSetMediaData = async () => {

    const parser = new DOMParser();
    const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

    const updatedData = await Promise.all(
      circolari.map(async (circolare) => {
        const mediaAtt = circolare.allegati;
        const mediaObjects = await Promise.all(
          mediaAtt.map(async (mediaTit) => {
            const mediaItem = Array.from(
              mediaNuoviDoc.querySelectorAll("item")
            ).find(
              (item) => item.querySelector("title").textContent === mediaTit["name"].slice(0, -4)
            );

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

        const validMediaObjects = mediaObjects.filter(
          (media) => media !== null
        );

        return {
          ...circolare,
          media: validMediaObjects,
        };
      })
    );

    setData(updatedData);
    return updatedData;
  };

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
    </div>
  );
}

export default App;
