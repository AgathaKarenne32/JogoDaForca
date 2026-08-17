import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Textos de Título e Subtítulo */}
      <Text style={styles.title}>JOGO DA VELHA</Text>
      <Text style={styles.subtitle}>Vez do Jogador: X</Text>

      {/* Tabuleiro */}
      <View style={styles.board}>
        {/* Linha 1 */}
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textX}>X</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textO}></Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textO}>O</Text>
          </View>
        </View>

        {/* Linha 2 */}
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textO}></Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textX}>X</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textO}></Text>
          </View>
        </View>

        {/* Linha 3 */}
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.textO}>O</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textO}></Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.textX}>X</Text>
          </View>
        </View>
      </View>

      {/* Ajusta a cor da barra de status do celular para combinar com o fundo escuro */}
      <StatusBar style="light" />
    </View>
  );
}

// Estilização (onde a mágica das cores acontece!)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A192F', // Azul escuro para o fundo
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FF8C00', // Laranja forte
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#66B2FF', // Azul claro
    marginBottom: 40,
  },
  board: {
    padding: 10,
    backgroundColor: '#112240', // Um tom de azul um pouco mais claro para destacar o tabuleiro
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FF8C00', // Borda laranja
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: '#FF8C00', // Borda laranja em cada quadrado
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#0A192F', // Fundo azul escuro nas células
    borderRadius: 8,
  },
  textX: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FF8C00', // 'X' em Laranja
  },
  textO: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#66B2FF', // 'O' em Azul claro
  },
});