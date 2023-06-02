import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';

const MS_IN_SECOND = 1000;
@Injectable({
  providedIn: 'root'
})
export class SpreadsheetEditorService {
  private readonly SPREADSHEET_ID = "10e7nLlT-bDaHKL5WcOdRDRzgukhu8L4VI55IVLWLkc8";
  private accessToken: string | null = null;
  private accessTokenObservable: Subject<void> = new Subject();
  private client: google.accounts.oauth2.TokenClient;
  private expirationTime: number = Date.now();

  constructor(private httpClient: HttpClient) {
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: '1047629961360-u19crfsim138dthiqm74h4fiseu09gi4.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      prompt: '',
      callback: (response: google.accounts.oauth2.TokenResponse) => {
        this.expirationTime = Date.now() + (Number(response.expires_in) * MS_IN_SECOND);
        this.accessToken = response.access_token;
        this.accessTokenObservable.next();
      },
    });
  }

  private buildRequestUrl(): string {
    return "https://sheets.googleapis.com/v4/spreadsheets/"
      + this.SPREADSHEET_ID
      + "/values/Sheet1:append?valueInputOption=USER_ENTERED"
  }
  private async ensureAccessToken() {
    const timeUntilExpiration = this.expirationTime - Date.now();
    const promise = firstValueFrom(this.accessTokenObservable);
    if (this.accessToken === null || timeUntilExpiration < MS_IN_SECOND) {
      this.client.requestAccessToken();
    } else {
      this.accessTokenObservable.next();
    }
    return promise;
  }

  async appendLine(amount: number, description: string, payer: string, final: boolean) {
    await this.ensureAccessToken();

    const date = new Date().toLocaleDateString();
    return this.httpClient
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
      )
  }
}
