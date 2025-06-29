using UnityEngine;

[RequireComponent(typeof(SpriteRenderer))]
[RequireComponent(typeof(Rigidbody2D))]
public class Particle : MonoBehaviour
{
    private Rigidbody2D _rb;
    private SpriteRenderer _renderer;

    public void Initialize(ParticleType type)
    {
        if (_rb == null) _rb = GetComponent<Rigidbody2D>();
        if (_renderer == null) _renderer = GetComponent<SpriteRenderer>();

        _renderer.color = type.GetColor();
        _rb.mass = type.density;
    }
}
