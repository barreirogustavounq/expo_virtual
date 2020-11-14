package ar.edu.unq.modelo

object BuscadorProductos {

    fun cantidadPalabrasContenidasEnTexto(textoDeBusqueda: String, texto: String): Int {
        return cantidadDeItemsContenidasEnTexto(palabrasContenidasEnTexto(textoDeBusqueda), texto)
    }

    fun cantidadDeItemsContenidasEnTexto(palabras: Iterable<String>, texto: String): Int {
        return palabras.map { it.toLowerCase() }.toSet().count { texto.contains(it, ignoreCase = true) }
    }

    fun palabrasContenidasEnTexto(texto: String): Iterable<String> {
        return texto.split(" ").filter { it != "" }
    }

    fun filtrar(texto: String, productos: Collection<Producto>): MutableList<Producto> {
        return productos.map {
            Pair(
                    cantidadPalabrasContenidasEnTexto(texto, it.itemName) + cantidadDeItemsContenidasEnTexto(it.listTags, texto) + cantidadPalabrasContenidasEnTexto(texto, it.description),
                    it
            )
        }.filter { it.first > 0 }.sortedBy {  it.second.itemName }.sortedByDescending { it.first }.map { it.second }.toMutableList()
    }

//    fun filtrar2(texto: String, productos: Collection<Producto>): MutableList<Producto> {
//        val resultado = emptyList<Pair<Producto, Int>>().toMutableList()
//        for (producto in productos) {
//            if (contienePalabrasDelNombre(texto.split(" "), producto.itemName) or contieneTags(texto, producto.listTags) or contienePalabrasDeLaDescripcion(texto, producto.description.split(" "))) {
//                val tupla = Pair(producto, cantidadPalabrasQueCoinciden(texto, producto.itemName.split(" ") + producto.description.split(" ")))
//                resultado.add(tupla)
//            }
//        }
//        return resultado.sortedByDescending() { it.second }.map { it.first }.toMutableList()
//    }
//
//    fun contienePalabrasDelNombre(palabrasBuscadas: List<String>, nombre: String): Boolean {
//        for (palabraBuscada in palabrasBuscadas) {
//            if (nombre.contains(palabraBuscada, ignoreCase = true)) {
//                return true
//            }
//        }
//        return false
//    }
//
//    fun contieneTags(texto: String, listaTags: List<String>): Boolean {
//        for (tag in listaTags) {
//            if (texto.contains(tag, ignoreCase = true)) {
//                return true
//            }
//        }
//        return false
//    }
//
//    fun contienePalabrasDeLaDescripcion(texto: String, palabrasDeLaDescripcion: List<String>): Boolean {
//        for (palabra in palabrasDeLaDescripcion) {
//            if (palabra != " " && texto.contains(palabra, ignoreCase = true)) {
//                println(palabra)
//                return true
//            }
//        }
//        return false
//    }
//
//    fun cantidadPalabrasQueCoinciden(texto: String, palabrasDescripcion: List<String>): Int {
//        var contador = 0
//        for (palabra in palabrasDescripcion) {
//            if (texto.contains(palabra)) {
//                contador += 1
//            }
//        }
//        return contador
//    }
}