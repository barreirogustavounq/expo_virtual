package ar.edu.unq.modelo.banner

enum class BannerCategory {
    HOME,
    SCHEDULE,
    CLASS,
    COURRIER,
    PAYMENTMETHODS;

    fun isValid(string: String): Boolean{
        return values().map { it.name }.contains(string)
    }
}