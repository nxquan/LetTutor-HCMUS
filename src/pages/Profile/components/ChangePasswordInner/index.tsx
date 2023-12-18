import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@/constants';
import {useTranslations} from '@/hooks';
import FormGroup from '@/components/FormGroup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Button from '@/components/Button';
import * as authService from '@/services/authService';
import {Toast} from 'toastify-react-native';

type Props = {
  toggleModal: (value: boolean) => void;
};

const ChangePasswordInner = (props: Props) => {
  const {toggleModal} = props;

  const {t} = useTranslations();

  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onChangePasswordState = (key: string, value: string) => {
    setPasswordState((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangePassword = async () => {
    const res = await authService.changePassword({
      newPassword: passwordState.newPassword,
      password: passwordState.currentPassword,
    });
    if (res.success) {
      const {data} = res.data;

      setPasswordState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toggleModal(false);
      Toast.success(data.message);
    }
  };

  return (
    <View style={{width: '100%'}}>
      <View className="flex-row justify-between items-center">
        <Text className="text-black text-base font-semibold">
          {t('signin.changePassword')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            toggleModal(false);
          }}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-px mt-4 bg-gray-300" />
      <View className="w-full pt-3">
        <FormGroup
          required
          title={t('curPassword')}
          type="password"
          field="currentPassword"
          value={passwordState.currentPassword}
          onChange={onChangePasswordState}
        />
        <FormGroup
          required
          title={t('newPassword')}
          type="password"
          field="newPassword"
          value={passwordState.newPassword}
          onChange={onChangePasswordState}
        />

        <FormGroup
          required
          title={t('newPassword')}
          type="password"
          value={passwordState.confirmPassword}
          field="confirmPassword"
          onChange={onChangePasswordState}
          duplicateValue={passwordState.newPassword}
        />
        <View className="flex-row self-end mt-4">
          <Button
            title="Cancel"
            onPress={() => {
              toggleModal(false);
            }}
            style={{
              borderColor: colors.primary,
              color: colors.primary,
            }}
          />
          <Button
            title="Save"
            onPress={() => {
              handleChangePassword();
            }}
            leftIcon={
              <Feather name="chevrons-right" size={20} color={colors.white} />
            }
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              marginLeft: 16,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordInner;
