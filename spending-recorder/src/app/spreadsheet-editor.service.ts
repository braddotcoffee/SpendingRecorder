import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetEditorService {
  private readonly SPREADSHEET_ID = "10e7nLlT-bDaHKL5WcOdRDRzgukhu8L4VI55IVLWLkc8";
  private user: SocialUser | null = null;
  private loggedIn: boolean = false;
  private accessToken: string = "";

  constructor(private authService: SocialAuthService, private httpClient: HttpClient) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }

  private buildRequestUrl(): string {
    return "https://sheets.googleapis.com/v4/spreadsheets/"
      + this.SPREADSHEET_ID
      + "/values/Sheet1:append?valueInputOption=USER_ENTERED"
  }

  async appendLine(amount: number, description: string, payer: string, final: boolean) {
    if (this.accessToken === "") {
      this.accessToken = await this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID);
    }
    const date = new Date().toLocaleDateString();
    this.httpClient
      .post(
        this.buildRequestUrl(),
        {
          "majorDimension": "ROWS",
          "values": [
            [
              payer,
              date,
              amount,
              description,
              final ? "Yes" : "No"
            ]
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      ).subscribe(response => console.log(response))
  }
}