# Aston SDK - Bare React Native Example

## Objetivo
El propósito de este repositorio es proporcionar una aplicación de ejemplo sencilla en React Native bare que integra el SDK de Aston, una biblioteca diseñada para facilitar la implementación de funcionalidades educativas en aplicaciones móviles. 

Este proyecto tiene como objetivo:
- **Demostración rápida**: Mostrar cómo funciona el SDK de Aston en un entorno real, permitiendo a los desarrolladores y clientes ver sus capacidades en acción.
- **Guía de integración**: Servir como una referencia práctica para que los clientes comprendan cómo integrar el SDK en sus propias aplicaciones React Native bare, incluyendo la configuración inicial, navegación y customización.
- **Base reproducible**: Ofrecer un punto de partida limpio y funcional que los desarrolladores puedan usar para experimentar, probar y personalizar el SDK según sus necesidades.

Este ejemplo está construido con un enfoque minimalista para mantener la claridad, pero incluye los elementos esenciales para interactuar con el Aston SDK, como navegación basada en stacks y una interfaz básica para explorar sus características.

## Requisitos previos
Para utilizar este repositorio y ejecutar la aplicación de ejemplo, necesitarás:

- **React Native**: Familiaridad con los fundamentos de React Native, como componentes, navegación y el uso de hooks.
- **JavaScript/TypeScript**: Comprensión de JavaScript moderno (ES6+) y, preferiblemente, nociones de TypeScript, ya que el Aston SDK y esta aplicación usan tipado estático para mayor robustez.

## Instalación TestApp
Sigue estos pasos para instalar y configurar la aplicación de ejemplo:

1. **Clona el repositorio**:
    ```
    git clone git@github.com:AstonApp/aston-testapp-react-native.git
    cd aston-sdk-bare-example
    ```

2. **Instala las dependencias**:
    ```
    npm install
    ```

3. **Instala el Aston SDK**:
    El sdk ya se encuentra declarado en el package.json y debería instalarse como parte del paso 2, en caso de ser necesario, puedes instalarlo explícitamente de esta manera:
    ```
    npm install ./aston-sdk-X.X.X.tgz
    ```

4. **Configura el entorno**:

    **iOS**:
    ```
    cd ios
    pod install
    cd ..
    ```

    **Android**:
    ```
    cd android
    ./gradlew
    cd ..
    ```

5. **Uso**: 
    Para ejecutar la aplicación de ejemplo y ver el Aston SDK en acción:
    ```
    npx react-native start
    ```

6. **Explora la app**:
    La aplicación inicia con una pantalla simple que tiene 2 inputs y un botón para abrir el Aston SDK.

    - **Aston API KEY**: El apiKey es un valor requerido para poder iniciar y será proporcionado por el equipo de Aston.
    - **Integrator user id**: Identificador único de usuario, en esta testapp puede ingresar cualquier valor. (El sdk recordará el progreso de cada uno).

    Al presionar el botón, navegarás al dashboard de educación del SDK, donde podés interactuar con sus funcionalidades (como lecciones o quizzes).

# Integración del Aston SDK

Esta sección detalla cómo integrar el SDK de Aston en una aplicación React Native bare desde 0, incluyendo la instalación de dependencias y la configuración necesaria.

## Requisitos previos
El SDK utiliza `peerDependencies` y `dependencies` en su `package.json` para gestionar sus dependencias de manera eficiente:

- **`dependencies`**: Estas son las librerías que el SDK incluye internamente y que se instalan automáticamente al agregar el paquete `.tgz`.
- **`peerDependencies`**: Estas son librerías que el SDK necesita para funcionar, pero que deben ser instaladas explícitamente por el cliente en su proyecto. Esto permite al cliente controlar la versión exacta de estas dependencias y asegura compatibilidad con su aplicación. En el caso de Aston, las `peerDependencies` incluyen:
  - `react`, `react-dom`, y `react-native`: Fundamentales para cualquier app React Native.
  - `@react-navigation/native`, `@react-navigation/stack`, y `react-native-gesture-handler`: Necesarios para la navegación basada en stacks.
  - `react-native-video` y `react-native-svg`: Librerías con componentes nativos (ver abajo).

### Por qué `react-native-video` y `react-native-svg` se instalan del lado del cliente
El SDK usa `react-native-video` para reproducir contenido multimedia y `react-native-svg` para renderizar gráficos vectoriales. Estas librerías están listadas como `peerDependencies` por que ambas contienen código nativo (C++/Java/Objective-C) que debe vincularse al proyecto del cliente mediante autolinking (React Native >= 0.60) o pasos manuales. El SDK no puede realizar esta vinculación por sí mismo al instalarse como un paquete `.tgz`, ya que depende del entorno del cliente.

Para instalarlas en tu proyecto:
```bash
npm install react-native-video react-native-svg
```

## Instalación del SDK
1. **Agrega el Aston SDK al proyecto**:
   - Descargá el paquete `aston-sdk-X.X.X.tgz` (Proporcionado por el equipo de Aston)
   - Instalalo en tu proyecto con:
     ```bash
     npm install /ruta/a/aston-sdk-X.X.X.tgz
     ```

2. **Configura las dependencias nativas**:
   - **iOS**: Navegá a la carpeta `ios` y ejecutá:
     ```bash
     cd ios
     pod install
     cd ..
     ```
   - **Android**: Navega a la carpeta `android` y ejecutá:
     ```
     cd android
     ./gradlew
     cd ..
     ```
## Setup

Antes de usar el Aston SDK en tu aplicación, es necesario configurarlo correctamente mediante la función `AstonSDK.init`. Esta configuración debe realizarse antes de invocar el `AstonNavigator` o cualquier otra funcionalidad del SDK. A continuación, te explicamos qué necesita el SDK para funcionar y cómo configurarlo.

### Configuración requerida
El SDK requiere una configuración inicial que se pasa a través de un objeto `AstonConfiguration`. Este objeto define las propiedades esenciales y opcionales para personalizar el comportamiento y la apariencia del SDK.

```tsx
import { AstonConfiguration, ThemeConfig, AstonNavigationBarProps } from '@aston/sdk';

export type AstonConfiguration = {
    apiKey: string;                    // Requerido: Clave de API proporcionada por el equipo de Aston
    theme?: ThemeConfig;               // Opcional: Configuración de tema para personalizar colores y estilos
    NavigationBar?: React.FC<AstonNavigationBarProps>; // Opcional: Componente personalizado para la barra de navegación
}
```

- **apiKey**: Clave única proporcionada por el equipo de Aston para autenticar y habilitar el SDK. Sin esto, el SDK no funcionará.

- **theme**: Objeto opcional que define colores, estilos de texto, botones y tarjetas para personalizar la UI del SDK (ver ejemplo abajo).

- **NavigationBar**: Componente opcional que reemplaza la barra de navegación predeterminada del SDK con una versión personalizada.

### Inicialización del SDK

```tsx
import { AstonSDK, AstonNavigator } from '@aston/sdk';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Aston: undefined;
};

export default function EducationScreen({ apiKey, integratorUserId }: { apiKey: string; integratorUserId: string }) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Inicializa el SDK antes de usarlo
  AstonSDK.init({
    apiKey,                           // Clave de API requerida
    theme: themeConfig,               // Tema personalizado (opcional)
    NavigationBar: AstonNavigationBar // Barra de navegación personalizada (opcional)
  });

  return (
    <AstonNavigator
      integratorUserId={integratorUserId} // Identificador único del usuario
      onExit={() => navigation.goBack()}  // Función para salir del SDK
    />
  );
}
```

### Ejemplo de themeConfig
El objeto ThemeConfig permite personalizar la apariencia del SDK. Podes ver nuestro manual de tipografias en figma: https://www.figma.com/design/NbgHeH3KVokpLSXFqAU9sT/Manual-de-Tipograf%C3%ADas?node-id=0-1&p=f&t=n33DLLx90jaJYk9s-0 

Aquí un ejemplo completo:

```tsx
const themeConfig: ThemeConfig = {
  colors: {
    primary: '#7F4293',      // Color principal
    background: '#FFFFFF',   // Fondo
    textPrimary: '#000000',  // Texto principal
    positive: '#31B700',     // Éxito
    negative: '#E80202',     // Error
    contrast: '#fff49b',     // Contraste
  },
  textStyles: {
    heading: { fontSize: 20, lineHeight: 22, fontFamily: 'Montserrat-Regular' },
    headingMedium: { fontSize: 20, lineHeight: 22, fontFamily: 'Montserrat-Medium' },
    headingStrong: { fontSize: 20, lineHeight: 22, fontFamily: 'Montserrat-Bold' },
    body: { fontSize: 16, lineHeight: 22, fontFamily: 'Montserrat-Regular' },
    bodyMedium: { fontSize: 16, lineHeight: 22, fontFamily: 'Montserrat-Medium' },
    bodyStrong: { fontSize: 16, lineHeight: 22, fontFamily: 'Montserrat-Bold' },
  },
  navBar: {
    navBarTextStyle: { fontSize: 18, lineHeight: 24, fontFamily: 'Montserrat-Bold' },
    navBarColor: '#FFFFFF',
  },
  buttonStyle: {
    style: { width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 24, elevation: 3, paddingVertical: 8 },
    primaryTextStyle: { fontSize: 16, lineHeight: 20, fontFamily: 'Montserrat-Bold', color: 'white' },
    secondaryTextStyle: { fontSize: 16, lineHeight: 20, fontFamily: 'Montserrat-Bold', color: '#804190' },
    primary: { backgroundColor: '#804190', borderWidth: 1.5, borderColor: '#804190' },
    secondary: { backgroundColor: 'white', borderWidth: 1.5, borderColor: '#804190' },
  },
  cardStyles: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
  },
};
```

### Ejemplo de NavigationBar personalizada
Podés proporcionar un componente personalizado para la barra de navegación que reciba title y goBack como props:

```tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const AstonNavigationBar = ({ title, goBack }: AstonNavigationBarProps) => {
  return (
    <View style={{ ...styles.container, backgroundColor: themeConfig.colors.primary }}>
      <View style={styles.sideContainer}>
        <Pressable onPress={goBack}>
          <Text numberOfLines={1} style={styles.title}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
      </View>
      <View style={styles.sideContainer} />
    </View>
  );
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
```

### Notas importantes
- **Orden**: Llamá a AstonSDK.init antes de renderizar AstonNavigator, o recibirás un error como "AstonSDK is not initialized!".

- **Errores**: Si omitís el apiKey, el SDK arrojará "API_KEY and userID from Integrator are required".

- **Personalización**: Tanto theme como NavigationBar son opcionales, pero si los omitís, el SDK usará valores predeterminados.

- **Dependencias**: Asegurate de que las peerDependencies (react-native, @react-navigation/stack, etc.) estén instaladas en tu proyecto, como se detalla en la sección anterior.

Y listo! Ya tenes todo lo necesario para comenzar a usar el SDK de Aston. Happy coding!