package ar.edu.unq.cucumber

import ar.edu.unq.dao.mongodb.MongoUsuarioDAOImpl
import ar.edu.unq.modelo.Usuario
import ar.edu.unq.services.UsuarioService
import ar.edu.unq.services.impl.UsuarioServiceImpl
import ar.edu.unq.services.impl.exceptions.UsuarioConDniInvalidoException
import ar.edu.unq.services.runner.DataBaseType
import cucumber.api.Scenario
import cucumber.api.java.After
import cucumber.api.java.en.And
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import kotlin.test.assertEquals
import kotlin.test.assertNotNull


class RegistrarUnUsuarioStepDef {

    val usuario = Usuario("Tobias", "Towers", 39484178)
    val usuarioService: UsuarioService = UsuarioServiceImpl(MongoUsuarioDAOImpl(), DataBaseType.TEST)
    var exceptionUsuarioConDniInvalidoException: UsuarioConDniInvalidoException? = null


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


    @When("^se quiere registrar un usuario$")
    fun seQuiereRegistrarUnUsuarioConDniInvalido(){
        try {
            this.usuarioService.crearUsuario(usuario)
        } catch(e: UsuarioConDniInvalidoException){
            exceptionUsuarioConDniInvalidoException = e
        }
    }

    @Then("^el usuario no se puede registrar por ingresar un dni menor a un millon$")
    fun elUsuarioNoSePuedeRegistrarPorIngresarUnDniMenorAUnMillon(){
        assertNotNull(exceptionUsuarioConDniInvalidoException)
    }

    @Given("^el usuario que se quiere volver a registrar$")
    fun siUnUsuarioRegistradoSeQuiereVolverARegistrarSeLeNotificaQueYaLoEstá(){

    }

    @After
    fun doSomethingAfter(scenario: Scenario?) {
        usuarioService.deleteAll()
    }



}