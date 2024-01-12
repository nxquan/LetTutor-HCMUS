import {useTranslation} from 'react-i18next';
import i18next from '@/utils/i18next';

function useTranslations() {
  const {t} = useTranslation();

  return {t, i18next};
}

export default useTranslations;
