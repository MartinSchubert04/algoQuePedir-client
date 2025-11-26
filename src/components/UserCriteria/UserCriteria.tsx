import { Restaurant } from "@components/Restaurant/Restaurant"
import { Ingredient } from "@components/Ingredient/Ingredient"
import { AddButton } from "@components/Buttons/AddButton/AddButton"
import { Input } from "@components/Input/Input"
import "./userCriteria.css"
import type { RestaurantProfileDTO } from "@domain/Restaurant"
import type React from "react"
import { useContext, useEffect, useState } from "react"
import { showError } from "@utils/errorHandling"
import { localService } from "@service/Local.service"
import { Context as UserContext } from "@context/UserContext"

type UserCriteriaType = {
    name: string,
    subTitle: string,
    checked: boolean,
    onToggle: (newValue: boolean) => void,
    isFaithfull?: boolean,
    isMarketing?: boolean,
    isImpatient?: boolean,
    handleRestDelete?: (e: React.MouseEvent, restaurant: RestaurantProfileDTO) => void,
    restList?: RestaurantProfileDTO[],
    setRestList?: (updateFn: (prev: RestaurantProfileDTO[]) => RestaurantProfileDTO[]) => void,
    marketingWordList?: string[],
    setMarketingWordList?: (updateFn: (prev: string[]) => string[]) => void;
    handleDeleteMarketing?: (e: React.MouseEvent, word: string) => void,
    distanciaMax?: number,
    handleChangeDistancia?: (e: React.MouseEvent, action: string) => void
}

export const UserCriteria = ({
    name,
    subTitle,
    checked,
    onToggle,
    isFaithfull = false,
    isMarketing = false,
    isImpatient = false,
    handleRestDelete,
    restList,
    marketingWordList,
    setMarketingWordList,
    handleDeleteMarketing,
    distanciaMax,
    handleChangeDistancia,
    setRestList
}: UserCriteriaType) => {
    const ctx = useContext(UserContext)
    const [marketingWord, setMarketingWord] = useState("")
    const [restListOptions, setRestListOptions] = useState<RestaurantProfileDTO[]>([])
    const [selectedRest, setSelectedRest] = useState("");

    const handleAddMarketing = (e: React.MouseEvent) => {
        e.preventDefault();
        if (marketingWord.trim() === "") return;

        setMarketingWordList?.(prev => [...prev, marketingWord.trim()]);
        setMarketingWord("");
    };

    const handleAddRest = (e: React.MouseEvent, rest: string) => {
        e.preventDefault();
        const restExists = restList?.some(curr => curr.nombreLocal === rest);
        if (!restExists) {
            const newRes = restListOptions.find(curr => curr.nombreLocal === rest);
            if (!newRes) {
                showError("No se encontró el restaurante");
                return;
            }
            setRestList(prev => [...prev, newRes]);

        } else {
            const msg = "Restaurante ya existe en la lista";
            showError(msg);
            throw new Error(msg);
        }
    };

    useEffect(() => {
        const loadRest = async () => {
            try {
                const res = await localService.getAllLocales(ctx!!.userId!!)
                console.log(res, ctx?.userId)
                setRestListOptions(res)
            } catch (e) {
                showError(`Error obteniendo los locales: ${e}`)
            }
        }
        loadRest()
    }, [])

    return (
        <div className="user-criteria-container">
            <label className="user-criteria-label">
                <div className="user-criteria-text">
                    <p className="criteria-name">{name}</p>
                    <p className="criteria-subTitle">{subTitle}</p>
                </div>
                <input className="criteria-checked" type="checkbox" name="checked" checked={checked} onChange={(e) => onToggle(e.target.checked)} />
            </label>

            {isFaithfull && restList &&
                (
                    <>
                        {restList.map((restaurant) => (
                            <Restaurant
                                key={restaurant.nombreLocal}
                                imgPath={restaurant.imgPath}
                                name={restaurant.nombreLocal}
                                distance={Number((restaurant.distancia / 1000).toFixed(2))}
                                deliveryType={restaurant.tipoDelivery}
                                puntuacion={restaurant.promedio}
                                hasDelete={true}
                                onDelete={handleRestDelete}
                            />))}
                        <div className="add-container">
                            <select
                                className="add-container"
                                name="select-restaurant"
                                value={selectedRest}
                                onChange={(e) => setSelectedRest(e.target.value)}
                            >
                                <option value="">Elija una opción</option>

                                {restListOptions.map(rest => (
                                    <option key={rest.nombreLocal} value={rest.nombreLocal}>
                                        {rest.nombreLocal}
                                    </option>
                                ))}
                            </select>
                            <AddButton action={(e: React.MouseEvent) => handleAddRest(e, selectedRest)} />
                        </div>
                    </>
                )
            }
            {
                isMarketing && marketingWordList && handleDeleteMarketing && (
                    <>
                        {marketingWordList.map((ingredient) => (
                            <Ingredient
                                key={ingredient}
                                name={ingredient}
                                onDelete={(e: React.MouseEvent) => handleDeleteMarketing(e, ingredient)}
                            />
                        ))}

                        <div className="add-container">
                            <Input
                                inputLabel="Agregar"
                                inputType="text"
                                value={marketingWord}
                                onChange={(val) => setMarketingWord(val)}
                                inputContainerClass="add-input-container"
                                inputClass="add-input"
                            />

                            <AddButton action={handleAddMarketing} />
                        </div>
                    </>
                )
            }
            {
                isImpatient && handleChangeDistancia &&
                <div className="distancia-max-container">
                    <p>Distancia (kms)</p>
                    <div className="distancia-controller-container">
                        <button onClick={(e: React.MouseEvent) => handleChangeDistancia(e, "-")}>-</button>
                        <p>{distanciaMax}</p>
                        <button onClick={(e: React.MouseEvent) => handleChangeDistancia(e, "+")}>+</button>
                    </div>
                </div>
            }
        </div >
    )
}