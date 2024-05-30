import "./App.css";
import { circolari } from "./davinci_news2.js";
import XMLCircolari from "./davinci_media.xml";
import XMLMediaVecchi from "./davinci_media.xml";
import XMLMediaNuovi from "./davinci_media.xml";
// import albihtml from "./albi.html"s
import React from "react";
import axios from "axios";
import moment from "moment";

import "moment/locale/it";

function App() {

  const [xmlMediaNuovi, setXmlMediaNuovi] = React.useState("");
  const [data, setData] = React.useState([]);


  function createItemsFromArray(array) {
    let items = "";
    let controll = [];

    array.forEach((obj, index) => {
      // const date = moment(obj["date"], "DD MMMM YYYY").format(
      //   "ddd, DD MMM YYYY HH:mm:ss Z"
      // );
      const date = moment("2022-12-31")
        .subtract(index, "days")
        .format("ddd, DD MMM YYYY HH:mm:ss Z");
      const date2 = moment("2022-12-31")
        .subtract(index, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      const date3 = moment("2022-12-31")
        .subtract(index, "days")
        .format("DD-MM-YYYY");
      const date4 = moment("2022-12-31").subtract(index, "days").unix();

      // const num = obj.title.match(/\d+/g)[0]

      const mediaString = () => {
        let Fstring = "";
        obj.media.map((el) => {
          var stringg = "";
          stringg = `i:${+el.id};s:${el.num}:"${el.guid}";`;
          Fstring += stringg;
        });
        return Fstring;
      };
      const mediagallery = () => {
        if (obj.gallery.length > 0) {
          // Creare la stringa degli ID
          const idsString = obj.gallery.map((media) => media.id).join(",");
          // Restituire la stringa formattata
          return `[gallery columns="2" size="large" link="file" ids="${idsString}"]`;
        } else {
          // Restituire una stringa vuota se non ci sono elementi validi
          return "";
        }
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

      const categoria = obj.category ? obj.category : "";
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
      <title><![CDATA[${obj["title"]}]]></title>

      <pubDate>${date}</pubDate>
   
      
      <description></description>
      <content:encoded><![CDATA[${obj["content"] ? obj["content"] : ""}  
        <br></br>
      ${mediagallery()}]]></content:encoded>
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
      <wp:post_type><![CDATA[post]]></wp:post_type>
  
      <wp:is_sticky>0</wp:is_sticky>
      <category domain="post_tag" nicename="notizie"><![CDATA[Notizie]]></category>
      <category domain="tipologia-articolo" nicename="notizie"><![CDATA[Notizie]]></category>
      <category domain="post_tag" nicename="${generaNiceName(
        categoria
      )}"><![CDATA[${categoria}]]></category>
      <category domain="tipologia-articolo" nicename="${generaNiceName(
        categoria
      )}"><![CDATA[${categoria}]]></category>
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
      <wp:meta_value><![CDATA[${obj["title"]}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_articolo_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${
        obj.media.length
      }:{${mediaString()}}]]></wp:meta_value>
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

 


 


  React.useEffect(() => {
    axios
      .get(XMLMediaNuovi, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        setXmlMediaNuovi(response.data);
      });    
  }, []);




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

 
  const fetchAndSetMediaData = async () => {
    const parser = new DOMParser();
    const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

    const updatedData = await Promise.all(
      circolari.map(async (circolare) => {
        const mediaAtt = circolare.attachments;
        const mediaGallery = circolare.images;
        const mediaObjects = await Promise.all(
          mediaAtt.map(async (mediaTit) => {
            const mediaItem = Array.from(
              mediaNuoviDoc.querySelectorAll("item")
            ).find(
              (item) =>
                item.querySelector("title").textContent ===
                mediaTit.slice(0, -4)
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
        const meediaObjGalleri = await Promise.all(
          mediaGallery.map(async (mediaTit) => {
            const mediaItem = Array.from(
              mediaNuoviDoc.querySelectorAll("item")
            ).find(
              (item) =>
                item.querySelector("title").textContent ===
                mediaTit.slice(0, -4)
            );

            if (mediaItem) {
              const id = mediaItem.querySelector("post_id").textContent;

              return {
                id: id,
              };
            }

            return null;
          })
        );
        const validMediaObjects = mediaObjects.filter(
          (media) => media !== null
        );
        const validMediaGallery = meediaObjGalleri
          .filter((media) => media !== null)
          .filter(
            (media, index, self) =>
              index === self.findIndex((m) => m.id === media.id)
          );
        // const tumb = () => {
        //   let id = "";
        //   var item = validMediaGallery.find((el) => {
        //     return (
        //       el.guid.endsWith(".jpg") ||
        //       el.guid.endsWith(".png") ||
        //       el.guid.endsWith(".jpeg")
        //     );
        //   });
        //   if (item) {
        //     id = item.id;
        //   }
        //   return id;
        // };
        const tumb = () => {
          let id = "";
          var item = validMediaGallery.find((el) => {
            return el.id;
          });
          if (item) {
            id = item.id;
          }
          return id;
        };
        return {
          ...circolare,
          tumb: tumb(),
          media: validMediaObjects,
          gallery: validMediaGallery,
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
  
    </div>
  );
}

export default App;
