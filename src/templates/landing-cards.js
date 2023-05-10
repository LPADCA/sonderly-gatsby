import React, { useEffect, createRef, useState } from 'react'
import {graphql} from 'gatsby'
import CommonLink from "@components/common-link"
import Layout from "@components/common/layout.js"
import Collapse from '@uiw/react-collapse'
import { RichText } from 'prismic-reactjs'
import "@styles/pages/landing-cards.scss"
/*
<div className='container-small'>
<div dangerouslySetInnerHTML={{ __html: training.text_inside_box.html }} />
{training.signup_button_link && training.signup_button_link.url && (
    <CommonLink
        className="button black"
        type={training.signup_button_link.type}
        to={training.signup_button_link.url}
        target={training.signup_button_link.target}
    >
        {training.signup_button_text}
    </CommonLink>
)}
</div>
*/

const LandingCard = ({ card, data }) => {
    const [open, setOpen] = useState('');
    const handleToggle = (e) => {
        e.stopPropagation();
        if (open === '0') {setOpen('')} else {setOpen('0')};
      };
      return (
        <div className='card'>
        <div className='top'>
            <div className='content'>
                <h2>{card.title.text}</h2>
                <p><span className='label'>{data.labels_level}</span> {card.level}</p>
                <p><span className='label'>{data.labels_length}</span> {card.length}</p>
                <p><span className='label'>{data.labels_recommended}</span> {card.recommended}</p>
                <p><span className='label'>{data.labels_certificate}</span> {card.certificate}</p>
                <p><span className='label'>{data.labels_format}</span> {card.format}</p>
                <p><span className='label'>{data.labels_prep}</span> {card.prep}</p>
                <p><span className='label'>{data.labels_type}</span> {card.type}</p>
                <div className='buttons'>
                    <div className="price-wrapper">
                        <div className="price">
                            <span className='label'>{data.labels_price} </span>{card.price}
                        </div>
                    </div>
                    <div className="buttons-wrapper">
                        <a className="button black" onClick={(e) => handleToggle(e)}>
                            {card.read_more_button_text}
                        </a>
                        {card.buy_button_link && card.buy_button_link.url && (
                            <CommonLink
                                className="button black"
                                type={card.buy_button_link.type}
                                to={card.buy_button_link.url}
                                target={card.buy_button_link.target}
                            >
                                {card.buy_button_text}
                            </CommonLink>
                        )}
                    </div>
                </div>
            </div>
            <div className='image'>
                <img src={card.image.url} width="300" alt={card.image.alt}/>
            </div>
        </div>
        <Collapse activeKey={open}>
            <Collapse.Panel>
                <RichText render={card.description.raw}/>
            </Collapse.Panel>
        </Collapse>
    </div> 
      )
    }



const LandingCards = ({ data, location }) => {
    const cards = data.prismicLandingCards.data.card
    return (
        <Layout location={location} className="landing-cards">
            <div className="container-medium">
                {cards.map((card, i) => (
                    <LandingCard card = {card} data = {data.prismicLandingCards.data}/>
                ))}
            </div>
        </Layout>
    )
}

export default LandingCards

export const query = graphql`
    query LandingCardsQuery {
        prismicLandingCards {
            data {
              card {
                type
                recommended
                read_more_button_text
                title {
                  text
                }
                description {
                    raw
                    html
                }
                price
                level
                length
                prep
                image {
                  url(imgixParams: {maxWidth: 600})
                  alt
                }
                certificate
                buy_button_text
                buy_button_link {
                  type
                  url
                }
                format
              }
              labels_certificate
              labels_format
              labels_length
              labels_prep
              labels_level
              labels_price
              labels_type
              labels_recommended
              seo_description
              seo_keywords
              seo_title
            }
            lang
        }
    }
`

