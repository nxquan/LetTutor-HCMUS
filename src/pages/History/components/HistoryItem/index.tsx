import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Entypo, AntDesign } from '@expo/vector-icons';

import Lesson from '@/components/Lesson';
import styles from './styles';
import ModalPopper from '@/components/ModalPopper';
import { colors } from '@/constants';
import OutsidePressHandler from 'react-native-outside-press';
import { images } from '@/assets';
import DropDownMenu from '@/components/DropdownMenu';

const reasons = [
  'Tutor was late',
  'Tutor was absent',
  'Network unstable',
  'Other',
];

const HistoryItem = () => {
  const [isOpenRequest, setIsOpenRequest] = useState(true);
  const [isOpenReview, setIsOpenReview] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<null | string>(null);

  const [reason, setReason] = useState({
    type: 'Choose a reason',
    notes: '',
  });

  const onChangeSelected = (item: any) => {
    setReason((prev: any) => {
      return {
        ...prev,
        type: item,
      };
    });
  };

  return (
    <Lesson>
      <View style={styles.requestHeader}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          Lesson Time: 01:00 - 01:25
        </Text>
      </View>
      <View style={styles.lessonComment}>
        <TouchableOpacity
          style={styles.lessonBar}
          onPress={() => setIsOpenRequest(!isOpenRequest)}
        >
          <Text style={{ fontSize: 14 }}>Request for lesson</Text>
          {!isOpenRequest ? (
            <Entypo name='chevron-small-right' size={24} color='black' />
          ) : (
            <Entypo name='chevron-small-down' size={24} color='black' />
          )}
        </TouchableOpacity>
        {isOpenRequest && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.commentText}>
              Currently there are no requests for this class. Please write down
              any requests for the teacher.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.lessonComment}>
        <TouchableOpacity
          style={styles.lessonBar}
          onPress={() => setIsOpenReview(!isOpenReview)}
        >
          <Text style={{ fontSize: 14 }}>Review from tutor</Text>
          {!isOpenReview ? (
            <Entypo name='chevron-small-right' size={24} color='black' />
          ) : (
            <Entypo name='chevron-small-down' size={24} color='black' />
          )}
        </TouchableOpacity>
        {isOpenReview && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.commentText}>
              Currently there are no requests for this class. Please write down
              any requests for the teacher.
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
        }}
      >
        <TouchableOpacity onPress={() => setIsOpenModal('rating')}>
          <Text style={styles.actionBtn}>Add a Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsOpenModal('report');
          }}
        >
          <Text style={styles.actionBtn}>Report</Text>
        </TouchableOpacity>
      </View>

      <ModalPopper visible={!!isOpenModal} transparent={true}>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', padding: 8 }}
          onPress={() => setIsOpenModal(null)}
        >
          <AntDesign name='close' size={20} color='black' />
        </TouchableOpacity>
        <View style={styles.modalInfo}>
          <Image source={images.avatar} style={styles.avatar} />
          <Text
            style={{
              fontSize: 14,
              color: colors.text,
              marginVertical: 4,
            }}
          >
            Lesson time
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            Thu, 26 Oct 23
          </Text>
        </View>
        <View
          style={{
            marginVertical: 16,
            height: 1,
            backgroundColor: colors.grey350,
          }}
        ></View>

        {isOpenModal === 'report' ? (
          <View style={styles.modalBody}>
            <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 8 }}>
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}
              >
                *
              </Text>
              What was the reason you cancel this booking?
            </Text>

            <DropDownMenu
              isOpen={isOpenMenu}
              onChangeOpen={setIsOpenMenu}
              data={reasons}
              selectedItem={reason.type}
              onChangeSelected={onChangeSelected}
            >
              <Pressable onPress={() => setIsOpenMenu(!isOpenMenu)}>
                <View
                  style={[
                    styles.dropdownBtn,
                    isOpenMenu && { borderColor: colors.primary },
                  ]}
                >
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: colors.text,
                    }}
                  >
                    {reason.type}
                  </Text>
                  {isOpenMenu ? (
                    <Entypo
                      name='chevron-small-down'
                      size={20}
                      color={colors.grey300}
                    />
                  ) : (
                    <Entypo
                      name='chevron-small-right'
                      size={20}
                      color={colors.grey300}
                    />
                  )}
                </View>
              </Pressable>
            </DropDownMenu>
            <TextInput
              multiline={true}
              numberOfLines={8}
              textAlignVertical='top'
              placeholder='Additional notes'
              onBlur={() => {}}
              style={{
                textAlign: 'left',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderColor: colors.grey350,
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 16,
                zIndex: -1,
                fontSize: 15,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModal(null);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  zIndex: -1,
                }}
              >
                <Text style={{ fontSize: 14, color: colors.text }}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModal(null);
                }}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  marginLeft: 16,
                  zIndex: -1,
                }}
              >
                <Text style={{ color: colors.white }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.modalBody}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}
              >
                *
              </Text>
              What is your rating for Keegan?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 4,
              }}
            >
              <AntDesign name='star' size={24} color={colors.yellow} />
              <AntDesign
                name='star'
                size={24}
                color={colors.yellow}
                style={{ marginHorizontal: 4 }}
              />
              <AntDesign
                name='star'
                size={24}
                color={colors.yellow}
                style={{ marginHorizontal: 4 }}
              />
              <AntDesign
                name='star'
                size={24}
                color={colors.yellow}
                style={{ marginHorizontal: 4 }}
              />
              <AntDesign name='staro' size={24} color={colors.yellow} />
            </View>
            <TextInput
              multiline={true}
              numberOfLines={8}
              textAlignVertical='top'
              placeholder='Content reviews'
              onBlur={() => {}}
              style={{
                textAlign: 'left',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderColor: colors.grey350,
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 16,
                zIndex: -1,
                fontSize: 14,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModal(null);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  zIndex: -1,
                }}
              >
                <Text style={{ fontSize: 14, color: colors.text }}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModal(null);
                }}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  marginLeft: 16,
                  zIndex: -1,
                }}
              >
                <Text style={{ color: colors.white }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ModalPopper>
    </Lesson>
  );
};

export default HistoryItem;
