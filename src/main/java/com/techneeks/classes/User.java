package com.techneeks.classes;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "users")
@Entity(name = "users")
public class User {
    @Id
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "gender")
    private String pol;
    @Column(name = "last_name")
    private String prezime;
    @Column(name = "authorization_")
    private int authority;
    @Column(name = "name")
    private String ime;
    @Column(name = "address")
    private String adresa;
    @Column(name = "phone_number")
    private String broj_telefona;
    @Column(name = "register_date")
    private LocalDateTime datum_registracije = LocalDateTime.now();
    @Column(name = "last_activity")
    private LocalDateTime last_activity = LocalDateTime.now();

    public User() {
    }

    public User(String email, String password, String pol, String prezime, int authority, String ime, String adresa, String broj_telefona, LocalDateTime datum_registracije, LocalDateTime last_activity) {
        this.email = email;
        this.password = password;
        this.pol = pol;
        this.prezime = prezime;
        this.authority = authority;
        this.ime = ime;
        this.adresa = adresa;
        this.broj_telefona = broj_telefona;
        this.datum_registracije = datum_registracije;
        this.last_activity = last_activity;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String firstName) {
        this.ime = firstName;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String lastName) {
        this.prezime = lastName;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String gender) {
        this.pol = gender;
    }

    public String getBroj_telefona() {
        return broj_telefona;
    }

    public void setBroj_telefona(String phone) {
        this.broj_telefona = phone;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String address) {
        this.adresa = address;
    }

    public LocalDateTime getDatum_registracije() {
        return datum_registracije;
    }

    public void setDatum_registracije(LocalDateTime register_date) {
        this.datum_registracije = register_date;
    }

    public LocalDateTime getLast_activity() {
        return last_activity;
    }

    public void setLast_activity(LocalDateTime last_activity) {
        this.last_activity = last_activity;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", pol='" + pol + '\'' +
                ", prezime='" + prezime + '\'' +
                ", authority=" + authority +
                ", ime='" + ime + '\'' +
                ", adresa='" + adresa + '\'' +
                ", broj_telefona='" + broj_telefona + '\'' +
                ", datum_registracije=" + datum_registracije +
                ", last_activity=" + last_activity +
                '}';
    }
}
