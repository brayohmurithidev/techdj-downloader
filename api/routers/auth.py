from fastapi import APIRouter
from starlette.responses import RedirectResponse
import urllib.parse
import requests

router = APIRouter(prefix='/auth')

SPOTIFY_CLIENT_ID = "db5154ed2c3d4d40973d85eb4dc44f33"
SPOTIFY_REDIRECT_URI = "https://7a43-102-217-67-107.ngrok-free.app/api/auth/spotify/callback"
SCOPES = "playlist-read-private user-read-email"
SPOTIFY_CLIENT_SECRET="690312bb086c4b8db3fd82965e6b7448"
FRONTEND_REDIRECT="http://localhost:5173/spotify/callback"


# Login
@router.get('/spotify/login')
def login():
    params = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "scope": SCOPES,
    }
    url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(params)
    return RedirectResponse(url)


# Callback
@router.get('/spotify/callback')
def spotify_callback(code: str):
    token_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(token_url, data=payload, headers=headers)
    data = response.json()

    access_token = data.get("access_token")
    refresh_token = data.get("refresh_token")

    # Optionally generate your own JWT and send to frontend
    redirect_url = f"{FRONTEND_REDIRECT}?token={access_token}"
    return RedirectResponse(f"http://localhost:5173/auth/callback?token={access_token}")