import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DonationValuePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const institution = location.state?.institution || '';
  const [selectedValue, setSelectedValue] = useState(50);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState('');

  const predefinedValues = [100, 200, 300, 500, 1000, 2000];

  const handlePredefinedClick = (value) => {
    setSelectedValue(value);
    setIsCustom(false);
    setCustomValue('');
    setError('');
    setTaxError('');
  };

  const handleCustomValueChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    setIsCustom(true);
    setError('');
    setTaxError('');
    
    const numValue = parseFloat(value);
    if (value && numValue < 50) {
      setError('Valor mínimo é R$ 50,00');
    }
  };

  const handleContinue = () => {
    const finalValue = isCustom ? parseFloat(customValue) : selectedValue;
    
    if (isCustom && (!customValue || finalValue < 50)) {
      setError('Por favor, insira um valor mínimo de R$ 50,00');
      return;
    }
    
    // Navegar para a página PIX com o valor
    navigate('/doacao/dados', { state: { value: finalValue, institution } });
  };

  const [taxError, setTaxError] = useState('');

  const handleTaxDeduction = () => {
    const finalValue = isCustom ? parseFloat(customValue) : selectedValue;
    
    if (!finalValue || finalValue < 250) {
      setTaxError('Para doar com dedução no Imposto de Renda, o valor mínimo é R$ 250,00');
      return;
    }
    
    navigate('/doacao/dados', { state: { value: finalValue, taxDeduction: true, institution } });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden w-full max-w-full">
      {/* Header Simples */}
      <header className="bg-white shadow-sm py-3 lg:py-6 w-full overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-6 max-w-full">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
            data-testid="voltar-btn"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-16 max-w-full overflow-x-hidden">
        <div className="max-w-2xl mx-auto w-full">
          {/* Title */}
          <h1 className="text-xl lg:text-4xl font-bold text-gray-800 text-center mb-4 lg:mb-12 break-words" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Escolha o valor do seu apoio
          </h1>

          {/* Value Selection Cards */}
          <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-4 lg:mb-8 px-0 lg:px-2 w-full">
            {predefinedValues.map((value) => (
              <button
                key={value}
                onClick={() => handlePredefinedClick(value)}
                className={`p-2 lg:p-6 rounded-xl lg:rounded-2xl border-2 transition-colors duration-200 overflow-hidden min-w-0 ${
                  selectedValue === value && !isCustom
                    ? 'border-pink-500 bg-pink-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-pink-300'
                }`}
              >
                <div className="text-xs lg:text-lg font-bold text-gray-800">R$</div>
                <div className="text-lg lg:text-4xl font-bold text-pink-500 whitespace-nowrap">{value.toLocaleString('pt-BR')}</div>
              </button>
            ))}
          </div>

          {/* Custom Value Input */}
          <div className="mb-4 lg:mb-8">
            <label className="block text-sm lg:text-lg font-semibold text-gray-700 mb-2 lg:mb-3">
              Outro valor:
            </label>
            <div className="relative">
              <span className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base lg:text-xl">
                R$
              </span>
              <input
                type="number"
                min="50"
                step="5"
                value={customValue}
                onChange={handleCustomValueChange}
                placeholder="Digite o valor"
                className={`w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-4 text-base lg:text-xl rounded-lg lg:rounded-xl border-2 transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-600' 
                    : isCustom 
                    ? 'border-pink-500 focus:border-pink-600' 
                    : 'border-gray-300 focus:border-pink-400'
                } focus:outline-none`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">{error}</p>
            )}
            <p className="text-gray-500 text-xs lg:text-sm mt-1 lg:mt-2">* Valor mínimo: R$ 50,00</p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 rounded-full py-3 lg:py-6 text-base lg:text-xl font-bold transition-colors duration-200 shadow-lg mb-2 lg:mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            data-testid="continue-button"
          >
            CONTINUAR
          </Button>

          {/* Tax Deduction Button */}
          <Button
            onClick={handleTaxDeduction}
            className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-2.5 lg:py-6 text-xs lg:text-lg font-semibold transition-all duration-300 mb-3 lg:mb-4 px-3 lg:px-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
            data-testid="tax-deduction-button"
          >
            Doar com dedução no Imposto de Renda
          </Button>
          {taxError && (
            <p className="text-red-500 text-xs lg:text-sm text-center mb-3 lg:mb-4">{taxError}</p>
          )}

          {/* Description Text */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 shadow-sm">
            <p className="text-gray-700 text-center leading-relaxed text-xs lg:text-base" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {institution === 'Campanha Rio Grande do Sul'
                ? 'Todos juntos pelo Rio Grande do Sul: você está colaborando com a nossa missão de levar ajuda emergencial às famílias atingidas pelas chuvas e enchentes, por meio de organizações parceiras que atuam diretamente nas regiões afetadas, como o ParaQuemDoar.'
                : institution === 'Campanha Pernambuco'
                ? 'Todos juntos pelo Rio Grande do Sul: você está colaborando com a nossa missão de levar ajuda emergencial às famílias atingidas pelas chuvas e enchentes, por meio de organizações parceiras que atuam diretamente nas regiões afetadas, como o ParaQuemDoar.'
                : institution
                ? `Todos juntos por ${institution}: você está colaborando com a nossa missão de promover prevenção e resposta emergencial em comunidades em risco, por meio de tecnologias e iniciativas de impacto, como o ParaQuemDoar.`
                : 'Você está colaborando com a nossa missão de promover prevenção e resposta emergencial em comunidades em risco, por meio de tecnologias e iniciativas de impacto, como o ParaQuemDoar.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationValuePage;
