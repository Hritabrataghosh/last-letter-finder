import { useState, useEffect } from "react";

export default function ResultsList({

    title,

    results,

    trapMode = false,

    collapsible = false

}){

    const [open,setOpen] =
        useState(false);

    const [copied,setCopied] =
        useState("");

    useEffect(()=>{

        if(copied==="")
            return;

        const timer =
            setTimeout(()=>{

                setCopied("");

            },1200);

        return ()=>clearTimeout(timer);

    },[copied]);

    const copyWord = async(word)=>{

        try{

            await navigator.clipboard.writeText(word);

            setCopied(word);

        }

        catch{

        }

    };

    const renderWord = (item)=>{

        const word =
            trapMode
            ? item.word
            : item;

        return(

            <div

                key={word}

                className="word-pill"

                onClick={()=>copyWord(word)}

            >

                <div className="word-text">

                    {word}

                </div>

                {

                    trapMode &&

                    <div className="trap-info">

                        {item.type==="self"
                            ? "SELF"
                            : item.trap}

                    </div>

                }

                {

                    copied===word &&

                    <div className="copied">

                        Copied

                    </div>

                }

            </div>

        );

    };

    if(collapsible){

        return(

            <div className="accordion">

                <div

                    className="accordion-header"

                    onClick={()=>setOpen(!open)}

                >

                    <span>

                        {open?"▼":"▶"}

                    </span>

                    <span>

                        {title}

                    </span>

                    <span>

                        {results.length}

                    </span>

                </div>

                {

                    open &&

                    <div className="accordion-content">

                        <div className="word-grid">

                            {

                                results.map(renderWord)

                            }

                        </div>

                    </div>

                }

            </div>

        );

    }

    return(

        <div className="panel">

            <div className="panel-title">

                {title}

                {" "}

                ({results.length})

            </div>

            <div className="word-grid">

                {

                    results.map(renderWord)

                }

            </div>

        </div>

    );

}