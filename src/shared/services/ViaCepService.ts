import axios from 'axios';

interface AddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class ViaCepService {
  async getAddressByCep(cep: string): Promise<AddressResponse> {
    const formattedCep = cep.replace(/\D/g, '');

    const response = await axios.get<AddressResponse>(
      `https://viacep.com.br/ws/${formattedCep}/json/`,
    );
    if ('erro' in response.data) {
      throw new Error('Invalid CEP');
    }
    return response.data;
  }
}
