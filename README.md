# Estatus conexión

Estatus de conexión limpio y sencillo.

## Instalación

> `npm i @codice-progressio/estatus-conexion`

## Uso

Agrega la libreria al modulo que desees.

```typescript
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
      BrowserModule,
      EstatusConexionModule
      ],
  providers: [],
  bootstrap: [AppComponent],
})

```

Inyecta el servicio en el componente:

```typescript
export class EstatusConexionComponent implements OnInit {
  constructor(private estatus: EstatusConexionService) {
    this.estatus
        .online
        .subscribe((estado) => (this.conectado = estado));
  }

  conectado: boolean = false;

  ngOnInit(): void {}
}
```
