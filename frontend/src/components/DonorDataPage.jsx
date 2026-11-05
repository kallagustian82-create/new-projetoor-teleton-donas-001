import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, FileText, Phone, Mail } from 'lucide-react';

const validateCPF = (cpf) => {
  const nums = cpf.replace(/\D/g, '');
  if (nums.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(nums)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(nums[i]) * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (parseInt(nums[9]) !== d1) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(nums[i]) * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  return parseInt(nums[10]) === d2;
};

const validateCNPJ = (cnpj) => {
  const nums = cnpj.replace(/\D/g, '');
  if (nums.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(nums)) return false;
  const weights1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const weights2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(nums[i]) * weights1[i];
  let d1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(nums[12]) !== d1) return false;
  sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(nums[i]) * weights2[i];
  let d2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(nums[13]) === d2;
};

const validateName = (name) => {
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  const words = trimmed.split(/\s+/).filter(w => w.length >= 2);
  if (words.length < 2) return false;
  return /^[A-Za-zÀ-ÿ\s]+$/.test(trimmed);
};

const DonorDataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Read from state or URL query params
  const searchParams = new URLSearchParams(location.search);
  const donationValue = location.state?.value || parseFloat(searchParams.get('value')) || 50;
  const isTaxDeduction = location.state?.taxDeduction || false;
  const institution = location.state?.institution || searchParams.get('institution') || '';
  const fromCampanha = location.state?.fromCampanha || searchParams.get('fromCampanha') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    document: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDocument = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) => 
        d ? `${a}.${b}.${c}-${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
      );
    }
    return numbers.slice(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, a, b, c, d, e) =>
      e ? `${a}.${b}.${c}/${d}-${e}` : d ? `${a}.${b}.${c}/${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
    );
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
      );
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
    );
  };

  const isFormFilled = formData.name.trim().length >= 3 &&
    formData.document.replace(/\D/g, '').length >= 11 &&
    formData.phone.replace(/\D/g, '').length >= 10 &&
    formData.email.includes('@');

  const handleContinue = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Digite seu nome e sobrenome (apenas letras)';
    }

    const docNums = formData.document.replace(/\D/g, '');
    if (docNums.length <= 11) {
      if (!validateCPF(docNums)) {
        newErrors.document = 'CPF inválido';
      }
    } else {
      if (!validateCNPJ(docNums)) {
        newErrors.document = 'CNPJ inválido';
      }
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'E-mail inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate('/doacao/pix', { 
        state: { 
          value: donationValue, 
          donor: formData,
          taxDeduction: isTaxDeduction,
          institution,
          fromCampanha
        } 
      });
    }, 800);
  };

  const handleAnonymous = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/doacao/pix', { 
        state: { 
          value: donationValue, 
          donor: null,
          taxDeduction: false,
          institution,
          fromCampanha
        } 
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Preparando pagamento...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <button 
            onClick={() => navigate(fromCampanha ? '/campanha-pernambuco' : '/doacao/valor')}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-left mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Dados pessoais
          </h1>
          <p className="text-gray-500 text-left mb-8">
            Valor da doação: <span className="font-bold text-pink-500">R$ {donationValue.toFixed(2).replace('.', ',')}</span>
          </p>

          {/* Form */}
          <div className="space-y-5 mb-8">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome completo ou Razão Social
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-name-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:border-pink-500 focus:outline-none transition-colors text-base`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* CPF/CNPJ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF ou CNPJ
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-document-input"
                  type="text"
                  value={formData.document}
                  onChange={(e) => handleChange('document', formatDocument(e.target.value))}
                  placeholder="000.000.000-00"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${errors.document ? 'border-red-400' : 'border-gray-300'} focus:border-pink-500 focus:outline-none transition-colors text-base`}
                />
              </div>
              {errors.document && <p className="text-red-500 text-sm mt-1">{errors.document}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-phone-input"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:border-pink-500 focus:outline-none transition-colors text-base`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-email-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:border-pink-500 focus:outline-none transition-colors text-base`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Tax Deduction Info */}
          {isTaxDeduction && (
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Após fazer sua doação, você poderá deduzir o valor no seu próximo Imposto de Renda. Em breve, você receberá um e-mail com o recibo da sua contribuição. Agradecemos imensamente por se juntar a nós nesse projeto social, que faz a diferença na vida de muitas pessoas!
              </p>
            </div>
          )}

          {/* Continue Button */}
          <Button
            data-testid="donor-continue-button"
            onClick={handleContinue}
            disabled={!isFormFilled}
            className={`w-full rounded-full py-6 text-xl font-bold transition-all duration-300 shadow-lg ${
              isFormFilled
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            CONTINUAR
          </Button>

          {/* Divider + Anonymous (hidden for tax deduction) */}
          {!isTaxDeduction && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">ou</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <Button
                data-testid="donor-anonymous-button"
                onClick={handleAnonymous}
                className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-5 text-lg font-semibold transition-all duration-300"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Doar anonimamente
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDataPage;
