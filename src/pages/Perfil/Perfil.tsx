import React, { useEffect, useState, useContext } from "react"
import { Header } from "../../components/Header/Header.component"
import { UserProfile } from "../../components/UserProfile/UserProfile"
import { Input } from "../../components/Input/Input"
import { Preference } from "@components/Preference/Preference"
import { UserCriteria } from "@components/UserCriteria/UserCriteria"
import "./perfil.css"
import { Ingredient } from "@components/Ingredient/Ingredient"
import { AddButton } from "@components/Buttons/AddButton/AddButton"
import { userService } from "@service/userService"
import { showError, showSuccess } from "@utils/errorHandling"
import type { PreferenceDTO, ProfileDTO } from "@domain/User"
import { Context as UserContext } from "../../context/UserContext"
import type { RestaurantProfileDTO } from "@domain/Restaurant"


export const Perfil = () => {
    const buildPreferences = () => {
        const result: PreferenceDTO[] = [];

        if (criteria.vegan)
            result.push({ tipo: "Veganos" });

        if (criteria.exquisite)
            result.push({ tipo: "Exquisitos" });

        if (criteria.conservative)
            result.push({ tipo: "Conservador" });

        if (criteria.faithfull)
            result.push({ tipo: "Fieles" });

        if (criteria.marketing)
            result.push({ tipo: "Marketing" });

        if (criteria.impatient)
            result.push({ tipo: "Impacientes" });

        return {
            tipo: "CondicionY",
            condiciones: result
        };
    };

    // Get ID by context
    const ctx = useContext(UserContext)
    if (!ctx) { throw new Error("UserContext no disponible") }
    if (!ctx.userId) {
        showError("Porfavor inicie sesión")
        throw new Error("No se encontró el usuario, por favor inicie sesión")
    }

    const [userData, setUserData] = useState<ProfileDTO | null>(null)
    const [currFavIng, setCurrFavIng] = useState("")
    const [currAvoidIng, setCurrAvoidIng] = useState("")
    const [ingList, setIngList] = useState<string[]>([])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const id = ctx.userId!!
                const data = await userService.getUserInfo(id)

                if (!data) {
                    showError("No se pudo obtener el perfil del usuario")
                    return
                }

                setUserData(data)
            } catch (err) {
                showError("Error cargando el usuario")
                console.log(err)
            }
        }

        const loadIngredients = async () => {
            try {
                const res = await userService.getIngData();
                setIngList(res);
            } catch (e) {
                showError(`Error obteniendo ingredientes: ${e}`)
            }
        };

        loadIngredients()
        loadUser()

        console.log(ingList)
    }, [])

    const [form, setForm] = useState({
        name: "",
        surname: "",
        address: "",
        location: 0,
        latitud: 0,
        longitude: 0,
        favIng: [] as string[],
        avoidIng: [] as string[],
        restosFavoritos: [] as RestaurantProfileDTO[],
        palabrasMarketing: [] as string[],
        distanciaMax: 0
    })
    useEffect(() => {
        if (userData) {
            setForm({
                name: userData.nombre,
                surname: userData.apellido,
                address: userData.direccion,
                location: userData.altura,
                latitud: userData.latitud,
                longitude: userData.longitud,
                favIng: userData.ingredientesPreferidos,
                avoidIng: userData.ingredientesEvitar,
                restosFavoritos: userData.restosFavoritos,
                palabrasMarketing: userData.palabrasMarketing,
                distanciaMax: userData.distanciaMax
            })
        }
    }, [userData])
    const [favIngtFormActive, setFavIngFormActive] = useState(false)
    const [avoidIngFormActive, setAvoidIngFormActive] = useState(false)
    const [criteria, setCriteria] = useState({
        vegan: false,
        exquisite: false,
        conservative: false,
        faithfull: false,
        marketing: false,
        impatient: false
    });

    useEffect(() => {
        if (userData) {
            setCriteria({
                vegan: userService.hasCondition("Veganos", userData.condicion),
                exquisite: userService.hasCondition("Exquisitos", userData.condicion),
                conservative: userService.hasCondition("Conservador", userData.condicion),
                faithfull: userService.hasCondition("Fieles", userData.condicion),
                marketing: userService.hasCondition("Marketing", userData.condicion),
                impatient: userService.hasCondition("Impacientes", userData.condicion),
            });
        }
    }, [userData]);
    const [criteriaFormActive, setCriteriaFormActive] = useState(false)

    if (!userData) { return <p>Cargando usuario {ctx.userId}</p> }

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (form.name == "" ||
            form.surname == "" ||
            form.address == "" ||
            form.latitud == 0 ||
            form.location == 0 ||
            form.longitude == 0) {
            showError("Porfavor complete todos los campos de informacion personal")
        }
        else {
            try {
                const profileData: ProfileDTO = {
                    id: userData.id,
                    nombre: form.name,
                    apellido: form.surname,
                    direccion: form.address,
                    altura: form.location,
                    latitud: form.latitud,
                    longitud: form.longitude,
                    ingredientesEvitar: form.avoidIng,
                    ingredientesPreferidos: form.favIng,
                    condicion: buildPreferences(),
                    restosFavoritos: form.restosFavoritos,
                    palabrasMarketing: form.palabrasMarketing,
                    distanciaMax: form.distanciaMax
                }
                await userService.updateProfile(ctx.userId!!, profileData)
                showSuccess("Perfil actualizado correctamente")
            }
            catch (error: any) {
                const message = error.response?.data?.message || error.response?.data || error
                showError(`Error: ${message}`)
            }
        }
    }

    const handleCriteriaClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setCriteriaFormActive(!criteriaFormActive)
    }
    const handleFavIngClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setFavIngFormActive(!favIngtFormActive)
    }
    const handleAvoidIngClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setAvoidIngFormActive(!avoidIngFormActive)
    }

    const handleRestDelete = (e: React.MouseEvent, restaurant: RestaurantProfileDTO) => {
        e.preventDefault();
        setForm(prev => ({
            ...prev,
            restosFavoritos: prev.restosFavoritos.filter(
                rest => rest.nombreLocal !== restaurant.nombreLocal
            )
        }));
    };
    const handleMarketingDelete = (e: React.MouseEvent, word: string) => {
        e.preventDefault()
        setForm(prev => ({
            ...prev,
            palabrasMarketing: prev.palabrasMarketing.filter(
                prevWord => prevWord !== word
            )
        }))
    }

    const handleChangeDistancia = (e: React.MouseEvent, action: string) => {
        e.preventDefault()
        if (action == "+") {
            setForm(prev => ({
                ...prev,
                distanciaMax: prev.distanciaMax + 1
            }))
        }
        else if (action == "-" && form.distanciaMax > 1) {
            setForm(prev => ({
                ...prev,
                distanciaMax: prev.distanciaMax - 1
            }))
        }
    }
    const handleAddFavIng = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currFavIng != "") {
            setForm(prev => {
                if (prev.favIng.includes(currFavIng)) return prev
                return {
                    ...prev,
                    favIng: [...prev.favIng, currFavIng]
                }
            })
        }
    };
    const handleAddAvoidIng = (e: React.MouseEvent) => {
        e.preventDefault()
        if (currAvoidIng === "") return
        setForm(prev => {
            if (prev.avoidIng.includes(currAvoidIng)) return prev

            return {
                ...prev,
                avoidIng: [...prev.avoidIng, currAvoidIng]
            }
        })
    }


    return (
        <div className="profile-main-container">
            <Header title="Perfil" />
            <UserProfile name={form.name} email="olivia.bennet@gmail.com" />

            <form className="profile-form">
                <h3 className="personal-info-title">Información personal</h3>
                <Input
                    inputLabel="Nombre"
                    inputType="text"
                    value={form.name}
                    onChange={(value) => setForm({ ...form, name: value })}
                    inputContainerClass="input-container-profile"
                    testId="input-nombre"
                />

                <Input
                    inputLabel="Apellido"
                    inputType="text"
                    value={form.surname}
                    onChange={(value) => setForm({ ...form, surname: value })}
                    inputContainerClass="input-container-profile"
                />

                <Input
                    inputLabel="Dirección"
                    inputType="text"
                    value={form.address}
                    onChange={(value) => setForm({ ...form, address: value })}
                    inputContainerClass="input-container-profile"
                />

                <Input
                    inputLabel="Altura"
                    inputType="number"
                    value={String(form.location)}
                    onChange={(value) => setForm({ ...form, location: Number(value) })}
                    inputContainerClass="input-container-profile"
                />

                <div className="coordinates-container">
                    <Input
                        inputLabel="Latitud"
                        inputType="number"
                        value={String(form.latitud)}
                        onChange={(value) => setForm({ ...form, latitud: Number(value) })}
                        inputContainerClass="input-container-profile"
                    />

                    <Input
                        inputLabel="Longitud"
                        inputType="number"
                        value={String(form.longitude)}
                        onChange={(value) => setForm({ ...form, longitude: Number(value) })}
                        inputContainerClass="input-container-profile"
                    />
                </div>

                <div className="preferences-container">
                    <h3 className="preferences-title">Preferencias</h3>
                    <Preference name="Criterios de búsqueda" onClick={handleCriteriaClick} />

                    <section className={`criteria-form ${criteriaFormActive ? "active" : ""}`}>
                        <UserCriteria
                            name="Veganos"
                            subTitle="Solo platos veganos"
                            checked={criteria.vegan}
                            onToggle={(newValue) => setCriteria({ ...criteria, vegan: newValue })}
                        />
                        <UserCriteria
                            name="Exquisitos"
                            subTitle="Solo platos de autor"
                            checked={criteria.exquisite}
                            onToggle={(newValue) => setCriteria({ ...criteria, exquisite: newValue })}
                        />
                        <UserCriteria
                            name="Conservadores"
                            subTitle="Solo platos con ingredientes favoritos"
                            checked={criteria.conservative}
                            onToggle={(newValue) => setCriteria({ ...criteria, conservative: newValue })}
                        />
                        <UserCriteria
                            name="Fieles"
                            subTitle="Solo restaurantes preferidos"
                            checked={criteria.faithfull}
                            onToggle={(newValue) => setCriteria({ ...criteria, faithfull: newValue })}
                            isFaithfull={true}
                            restList={form.restosFavoritos}
                            handleRestDelete={handleRestDelete}
                            setRestList={(updateFn) =>
                                setForm(prev => ({
                                    ...prev,
                                    restosFavoritos: updateFn(prev.restosFavoritos)
                                }))
                            }
                        />
                        <UserCriteria
                            name="Marketing"
                            subTitle="Filtran platos por palabras buscadas"
                            checked={criteria.marketing}
                            onToggle={(newValue) => setCriteria({ ...criteria, marketing: newValue })}
                            isMarketing={true}
                            marketingWordList={form.palabrasMarketing}
                            handleDeleteMarketing={handleMarketingDelete}
                            setMarketingWordList={(updateFn) =>
                                setForm(prev => ({
                                    ...prev,
                                    palabrasMarketing: updateFn(prev.palabrasMarketing)
                                }))
                            }
                        />
                        <UserCriteria
                            name="Impacientes"
                            subTitle="Dentro de una distancia máxima"
                            checked={criteria.impatient}
                            onToggle={(newValue) => setCriteria({ ...criteria, impatient: newValue })}
                            isImpatient={true}
                            distanciaMax={form.distanciaMax}
                            handleChangeDistancia={handleChangeDistancia}
                        />
                    </section>
                    <Preference name="Ingredientes preferidos" onClick={handleFavIngClick} />
                    <section className={`ing-form ${favIngtFormActive ? "ing-form-active" : ""}`}>
                        {form.favIng.map((ing) => (
                            <Ingredient
                                key={ing}
                                name={ing}
                                onDelete={(e: React.MouseEvent) => {
                                    e.preventDefault()
                                    setForm(prev => ({
                                        ...prev,
                                        favIng: prev.favIng.filter(i => i !== ing)
                                    }))
                                }}
                            />
                        ))}
                        <div className="add-container">
                            <select name="add-favIng" onChange={(e) => setCurrFavIng(e.target.value)}>
                                <option value="" disabled selected>Porfavor ingrese un valor</option>
                                {ingList.map((ing) => (
                                    <option value={ing} key={ing}>
                                        {ing}
                                    </option>
                                ))}
                            </select>

                            <AddButton action={handleAddFavIng} />
                        </div>
                    </section>

                    <Preference name="Ingredientes a evitar" onClick={handleAvoidIngClick} />
                    <section className={`ing-form ${avoidIngFormActive ? "ing-form-active" : ""}`}>
                        {form.avoidIng.map((ing) => (
                            <Ingredient
                                key={ing}
                                name={ing}
                                onDelete={(e: React.MouseEvent) => {
                                    e.preventDefault()
                                    setForm(prev => ({
                                        ...prev,
                                        avoidIng: prev.avoidIng.filter(i => i !== ing)
                                    }))
                                }}
                            />
                        ))}
                        <div className="add-container">
                            <select name="add-avoidIng" onChange={(e) => setCurrAvoidIng(e.target.value)}>
                                <option value="" selected disabled>Seleccionar ingrediente...</option>
                                {ingList.map((ing) => (
                                    <option key={ing} value={ing}>
                                        {ing}
                                    </option>
                                ))}
                            </select>
                            <AddButton action={handleAddAvoidIng} />
                        </div>
                    </section>
                </div>
                <button type="submit" className="save-profile-button" onClick={handleSave}>Guardar</button>
            </form>
        </div>
    )
}