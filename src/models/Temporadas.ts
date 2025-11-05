abstract class Temporadas {
    private _tarifaBaseDiaria: number;

    constructor(tarifaBaseDiaria: number) {
        this._tarifaBaseDiaria = tarifaBaseDiaria;
    }

    public setTarifaBaseDiaria(value: number) { this._tarifaBaseDiaria = value; }

    public getTarifaBaseDiaria(): number { return this._tarifaBaseDiaria; }

}

export default Temporadas