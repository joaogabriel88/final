import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Parse from '../parseConfig';

export default function HomeScreen() {
  const [camisas, setCamisas] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarCamisas = async () => {
      const Camisa = Parse.Object.extend('Camisas');
      const query = new Parse.Query(Camisa);
      const resultados = await query.find();

      const lista = resultados.map((item) => ({
        id: item.id,
        nome: item.get('nome'),
        preco: item.get('preco'),
        imagemUrl: item.get('image')?.url(), 
      }));

      setCamisas(lista);
      setCarregando(false);
    };

    buscarCamisas();
  }, []);

  const adicionarSubtotal = (preco) => {
    setSubtotal((prev) => prev + preco);
  };

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>camisas disponíveis</Text>
      <FlatList
        data={camisas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => adicionarSubtotal(item.preco)}>
            {item.imagemUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>R$ {item.preco}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.subtotal}>Subtotal: R$ {subtotal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  imagem: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: '500',
  },
  preco: {
    fontSize: 16,
    color: '#333',
  },
  subtotal: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
