import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent {
    public stocks: AppspotStocks[] = [];
    public loading = true;
    private http: Http;
    private baseUrl: string;
    private interval: any;
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.http = http;
        this.onReload();
        this.interval = setInterval(() => {
            this.onReload();
        }, 5000);
    }

    onReload() {
        this.http.get(this.baseUrl + 'api/stocks').subscribe(result => {
            let data = JSON.parse(result.json()) as AppspotData;
            this.stocks = data.stock;
            this.loading = false;
        }, error => {
            console.error(error);
            this.loading = false;
            })
    }
}

interface AppspotData {
    stock: AppspotStocks[];
    as_of: string;
}

interface AppspotStocks {
    name: string;
    volume: number;
    price: AppspotPrice;
    symbol: string;
    percent_change: string;
}

interface AppspotPrice {
    currency: string;
    amount: number;
}