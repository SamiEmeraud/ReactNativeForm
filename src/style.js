import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "rgb(228, 237, 234)",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titre: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  champ: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
  },
  saisie: {
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
  },
  bouton: {
    backgroundColor: "#c38209",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
    // ombre iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // ombre Android
    elevation: 3,
  },
  boutonPresse: {
    backgroundColor: "#1E3A8A",
    opacity: 0.9,
  },
  boutonTexte: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
ligneSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  libelleSwitch: {
    fontSize: 16,
    color: "#111827",
  },

zone: { height: 200, backgroundColor: '#FFFFFF', borderRadius: 10, marginTop: 12 },
ligneTexte: { fontSize: 16, padding: 10 },


// image

ligneImages: {
  flexDirection: 'row',       // met les images côte à côte
  alignItems: 'center',       // alignement vertical
  justifyContent: 'space-between',   // centrage horizontal
  gap: 16,                    // espace entre les images
  marginTop: 12,
},
logo: {
  width: 64,
  height: 64,
},


banniere: {
  width: '100%',
  height: 160,
  borderRadius: 12,
  overflow: 'hidden',        // coupe l'image aux coins arrondis
  justifyContent: 'center',  // centre le titre verticalement
  alignItems: 'center',      // centre le titre horizontalement
  marginBottom: 16,
},
titreBanniere: {
  color: '#fff',
  fontSize: 24,
  fontWeight: '700',
  textShadowColor: 'rgba(0,0,0,0.6)',  // lisible sur n'importe quelle image
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
},


});

export default styles;