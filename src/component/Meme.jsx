import React from "react"

export default function Meme () {
        
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage:"https://i.imgflip.com/28j0te.jpg"
    })

    const [allMemeImages,setAllMemeImages] = React.useState([])

    React.useEffect(() =>{
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes) )
    },[])

    function getMemeImage () {
        const randomNumber = Math.floor(Math.random()  * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url,
            topText: '',
            bottomText: ''
        }))
    }

    function handleChange (event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form-input"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    className="form-input"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                 />
                <button
                className="form-button"
                onClick={getMemeImage}
                >
                Get a meme image </button>
            </div>
            <div className="div">
            <img src={meme.randomImage} className="meme-image"></img>
            <h2 className="meme-text top">{meme.topText}</h2>
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
            {/* <a href = "#div"
            Download = "test_image">
            <button type = "button"> Download </button>
            </a> */}
        </main>
    )
}