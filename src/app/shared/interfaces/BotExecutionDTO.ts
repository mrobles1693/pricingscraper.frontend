export interface BotExecutionDTO {
    nIdBotExecution : number,
    nIdTurno? : number,
    dFechaIni : Date,
    dFechaFin? : Date,
    sFechaIni? : string,
    sFechaFin? : string,
    nMinutos? : number,
    nCantProductos? : number,
    nCantSimilar? :  number,
    nCantProductosScrap? : number,
    nCantSimilarScrap? : number,
}

export interface BotExecutionReportDTO {
    sSKU : string,
    sDescripcion : string,
    nIdComercio : number,
    sComercio : string,
    nPrecio : number,
    nPrecioOferta? : number,
    nPrecioTarjeta? : number,
}