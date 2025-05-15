export async function getAllUserMessages()
{
    const url = 'http://127.0.0.1:5212/api/UserMessage'
    let userMessageList = [];

    try
    {
        if(url != null)
        {
            let response = await fetch(url)
            if(response.ok)
            {
                let data = await response.json()
                userMessageList = data;
            } else 
            {
                console.log("API FETCH ERROR: " + response.status)
            }
        }

    } catch (error)
    {
        alert("Promise failed\n\n" + error + "\n\nPlease try again by reloading the page or checking your server.")
    }
}

export async function createNewUserMessage()
{
    const username = document.getElementById('user-name').value
    const email = document.getElementById('user-email').value
    const message = document.getElementById('user-message').value

    const alert = document.getElementById('alert')
    alert.style.backgroundColor = 'var(--alert)'

    if(username === null || username === undefined || username === '' || username.trim().length == 0)
    {
        alert.style.display = 'block'
        alert.innerHTML = 'You must fill out the <u>username</u> field.'
    } 
    else if(email === null || email === undefined || email === '' || email.trim().length == 0)
    {
        alert.style.display = 'block'
        alert.innerHTML = 'You must fill out the <u>email</u> field.'
    } 
    else if(message === null || message === undefined || message === '' || message.trim().length == 0)
    {
        alert.style.display = 'block'
        alert.innerHTML = 'You must fill out the <u>message</u> field.'
    }
    else 
    {
        alert.style.display = 'none';

        let newUserMessage = {
            username: username,
            useremail: email,
            usertext: message
        }

        try 
        {
            await fetch('http://127.0.0.1:5212/api/UserMessage', {
                method: "POST",
                body: JSON.stringify(newUserMessage),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            
        } catch (error) 
        {
            console.log(error)
            alert.innerHTML = 'Something went wrong. Please try again later or email me directly at <a href="mailto:bryceccode@gmail.com">bryceccode@gmail.com</a>.'
        }
    }
}

export async function getSnakeLeaderboard()
{
    const url = 'http://127.0.0.1:5212/api/Leaderboard'
    let leaderboardList = [];

    try
    {
        if(url != null)
        {
            let response = await fetch(url)
            if(response.ok)
            {
                let data = await response.json()
                leaderboardList = data;
            } else 
            {
                console.log("API FETCH ERROR: " + response.status)
            }
        }

    } catch (error) 
    {
        alert("Promise failed\n\n" + error + "\n\nPlease try again by reloading the page or checking your server.")
    }

    return leaderboardList;
}

export async function createNewSnakeScore(score, username)
{
    let newSnakeScore = {
        userName: username,
        userScore: score
    }

    try 
    {
        await fetch('http://127.0.0.1:5212/api/Leaderboard', {
            method: "POST",
            body: JSON.stringify(newSnakeScore),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
    } catch (error) 
    {
        console.log(error)
        alert.innerHTML = 'Something went wrong. Please try again later or email me directly at <a href="mailto:bryceccode@gmail.com">bryceccode@gmail.com</a>.'
    }
    
}