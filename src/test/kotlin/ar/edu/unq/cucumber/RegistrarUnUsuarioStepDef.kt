package ar.edu.unq.cucumber

import ar.edu.unq.dao.mongodb.MongoProveedorDAOImpl
import ar.edu.unq.dao.mongodb.MongoUsuarioDAOImpl
import ar.edu.unq.modelo.Admin
import ar.edu.unq.modelo.Usuario
import ar.edu.unq.services.ProveedorService
import ar.edu.unq.services.UsuarioService
import ar.edu.unq.services.impl.ProveedorServiceImpl
import ar.edu.unq.services.impl.UsuarioServiceImpl
import ar.edu.unq.services.runner.DataBaseType
import cucumber.api.PendingException
import cucumber.api.java.en.And
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import kotlin.test.assertEquals


class RegistrarUnUsuarioStepDef {

    val usuario = Usuario("Tobias", "Towers", 39484178)
    val usuarioService: UsuarioService = UsuarioServiceImpl(MongoUsuarioDAOImpl(), DataBaseType.TEST)


    @Given("^un nombre \"([^\"]*)\"$")
    fun unNombre(nombre: String?) {
        this.usuario.nombre = nombre!!
    }

    @Given("^un apellido \"([^\"]*)\"$")
    fun unApellido(apellido: String?) {
        this.usuario.apellido = apellido!!
    }

    @Given("^un dni (\\d+)$")
    fun unDni(dni: Int?) {
        this.usuario.dni = dni!!
    }

    @When("^se registra un usuario$")
    fun seRegistraUnUsuario() {
       this.usuarioService.crearUsuario(usuario)
    }

    @Then("^el usuario se encuentra en la DB$")
    fun elUsuarioSeEncuentraEnLaDB() {
        val usuarioRecuperado = this.usuarioService.recuperarUsuario(usuario.dni)
        assertEquals(usuario.dni, usuarioRecuperado.dni)

    }

    @And("^sus datos son \"([^\"]*)\", \"([^\"]*)\", (\\d+)$")
    fun susDatosSon(nombre: String?, apellido: String?, dni: Int?) {
        val usuarioRecuperado = this.usuarioService.recuperarUsuario(usuario.dni)
        assertEquals(usuario.nombre,usuarioRecuperado.nombre)
        assertEquals(usuario.apellido, usuarioRecuperado.apellido)
        assertEquals(usuario.dni, usuarioRecuperado.dni)
    }
}