import React, {useRef} from 'react';
import {
  AstonSDK,
  AstonNavigator,
  ThemeConfig,
  AstonNavigationBarProps,
  AstonSDKRef,
} from '@aston/sdk';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type EducationScreenProps = {
  apiKey: string;
  integratorUserId: string;
};

export default function EducationScreen({
  apiKey,
  integratorUserId,
}: EducationScreenProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const astonRef = useRef<AstonSDKRef>(null);
  const customNavigation = true;

  AstonSDK.init({
    apiKey,
    theme: themeConfig,
    environment: 'development',
    // NavigationBar: AstonNavigationBar // Si queres utilizar tu propia navigationBar en el SDK, envia tu componente acá
  });

  const goBack = () => {
    astonRef.current?.goBack();
  };

  return (
    <>
      {customNavigation && (
        <AstonNavigationBar title="Education" goBack={goBack} />
      )}
      <AstonNavigator
        ref={astonRef}
        integratorUserId={integratorUserId}
        customNavigation={customNavigation}
        onExit={() => navigation.goBack()}
      />
    </>
  );
}

const AstonNavigationBar = ({title, goBack}: AstonNavigationBarProps) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: themeConfig.colors.primary,
      }}>
      <View style={styles.sideContainer}>
        <Pressable onPress={goBack}>
          <Text numberOfLines={1} style={styles.title}>
            ←
          </Text>
        </Pressable>
      </View>

      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.sideContainer} />
    </View>
  );
};

const themeConfig: ThemeConfig = {
  colors: {
    primary: '#AA54FC',
    background: '#F7F5F7',
    textPrimary: '#1A161E',
    positive: '#31B700',
    negative: '#E80202',
    contrast: '#fff49b',
    textColorForPrimaryBg: '#FFFFFF',
  },
  textStyles: {
    heading: {
      fontSize: 20,
      lineHeight: 22,
      fontFamily: 'Montserrat-Regular',
    },
    headingMedium: {
      fontSize: 20,
      lineHeight: 22,
      fontFamily: 'Montserrat-Medium',
    },
    headingStrong: {
      fontSize: 20,
      lineHeight: 22,
      fontFamily: 'Montserrat-Bold',
    },
    body: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: 'Montserrat-Regular',
    },
    bodyMedium: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: 'Montserrat-Medium',
    },
    bodyStrong: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: 'Montserrat-Bold',
    },
  },
  navBar: {
    navBarTextStyle: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: 'Montserrat-Bold',
      color: '#FFFFFF',
    },
    navBarColor: '#AA54FC',
  },
  buttonStyle: {
    style: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 24,
      elevation: 3,
      paddingVertical: 8,
    },
    primaryTextStyle: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'Montserrat-Bold',
      color: 'white',
    },
    secondaryTextStyle: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'Montserrat-Bold',
      color: '#AA54FC',
    },
    primary: {
      backgroundColor: '#AA54FC',
      borderWidth: 1.5,
      borderColor: '#AA54FC',
    },
    secondary: {
      backgroundColor: 'white',
      borderWidth: 1.5,
      borderColor: '#AA54FC',
    },
  },
  cardStyles: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 16,
    gap: 16,
    backgroundColor: '#F7F5F7',
    shadowColor: '#AA54FC',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    width: '100%',
  },
  sideContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
