import { Injectable } from '@angular/core';
import { DBT_CATEGORY, DBT_SUB_CATEGORY, I_CATEGORY, I_SUB_CATEGORY } from '@assets/data/MOCK_DATA';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class ApiService {
  /**
   * Simula una llamada a la API con un delay de 2 segundos.
   * Retorna un Observable con una lista de números del 1 al 10.
   */
  getFakeData(): Observable<number[]> {
    const fakeData = Array.from({ length: 10 }, (_, i) => i + 1); // Genera [1, 2, ..., 10]
    return of(fakeData).pipe(delay(2000)); // Simula una espera de 2 segundos
  }

  getFakeCategories(): Promise<I_CATEGORY[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DBT_CATEGORY);
      }, 2000);
    });
  }

  /* getFakeSubCategories(idCat): Observable<I_SUB_CATEGORY> {
    
  } */
}
