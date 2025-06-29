using UnityEngine;
using System;

[Serializable]
public class ParticleType
{
    public string name;
    public string colorHex;
    public float density;

    public Color GetColor()
    {
        if (ColorUtility.TryParseHtmlString(colorHex, out var c))
            return c;
        return Color.white;
    }
}
